import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UberMap from "../../components/Ubermap";
import { captioncontext } from "../context/Captioncontext.jsx";
import { Usercontext } from "../context/Usecontext.jsx";
import socket from "../utils/socket.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Captionriding = () => {
  const navigate=useNavigate()
  const [rideStatus, setRideStatus] = useState("picking-up");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [showFinishScreen, setShowFinishScreen] = useState(false);
  const [mapStart, setMapStart] = useState(null);
  const [mapEnd, setMapEnd] = useState(null);
  const { caption } = useContext(captioncontext);
  const { user, pickupname, droplocname, pickupppp, Price, yourloc, rideStartCoords, rideDropCoords } = useContext(Usercontext);
  const [data, setData] = useState({});

  useEffect(() => {
    const handleRideAccepted = (payload = {}) => {
      const ride = payload?.ride && typeof payload.ride === "object" ? payload.ride : payload;
      if (ride && typeof ride === "object") {
        setData(ride);
      } else {
        setData({});
      }

      // Prefer coordinates sent directly in the socket payload (from passenger's GPS)
      const payloadPickup = ride?.pickupCoords;
      const payloadDrop = ride?.dropCoords;
      if (payloadPickup?.latitude != null) {
        setMapStart({ latitude: Number(payloadPickup.latitude), longitude: Number(payloadPickup.longitude) });
      }
      if (payloadDrop?.latitude != null) {
        setMapEnd({ latitude: Number(payloadDrop.latitude), longitude: Number(payloadDrop.longitude) });
      }
    };

    socket.on("laststep", handleRideAccepted);
    return () => {
      socket.off("laststep", handleRideAccepted);
    };
  }, []);

  const pickup = data?.pickup || data?.valuepick || pickupname || pickupppp || localStorage.getItem("finalpickup") || "Unknown pickup";
  const dropoff = data?.drop || data?.dropoff || data?.valuedrop || droplocname || localStorage.getItem("finaldrop") || "Unknown drop-off";
  const fare = data?.fare ?? Price ?? localStorage.getItem("ridePrice") ?? "0.00";

  useEffect(() => {
    const geocode = async () => {
      const isCurrentLocationPickup =
        pickup && pickup.toString().trim().toLowerCase() === "your current location";

      if (!mapStart && isCurrentLocationPickup) {
        const currentPickupCoords = rideStartCoords || yourloc;
        if (currentPickupCoords?.latitude != null && currentPickupCoords?.longitude != null) {
          setMapStart({
            latitude: Number(currentPickupCoords.latitude),
            longitude: Number(currentPickupCoords.longitude),
          });
        }
      }

      if (!mapEnd && rideDropCoords?.latitude != null && rideDropCoords?.longitude != null) {
        setMapEnd({
          latitude: Number(rideDropCoords.latitude),
          longitude: Number(rideDropCoords.longitude),
        });
      }

      if (mapStart && mapEnd) return;
      if (!pickup || !dropoff || pickup === "Unknown pickup" || dropoff === "Unknown drop-off") return;

      try {
        if (!mapStart && !isCurrentLocationPickup) {
          const pickupRes = await axios.post(`${import.meta.env.VITE_BASEURL_senddetails}/senddetails`, { location: pickup });
          const pickupCoords = pickupRes?.data?.latlon;
          if (pickupCoords?.latitude != null && pickupCoords?.longitude != null) {
            setMapStart({ latitude: pickupCoords.latitude, longitude: pickupCoords.longitude });
          }
        }

        if (!mapEnd) {
          const dropRes = await axios.post(`${import.meta.env.VITE_BASEURL_senddetails}/senddetails`, { location: dropoff });
          const dropCoords = dropRes?.data?.latlon;
          if (dropCoords?.latitude != null && dropCoords?.longitude != null) {
            setMapEnd({ latitude: dropCoords.latitude, longitude: dropCoords.longitude });
          }
        }
      } catch {
        // no-op
      }
    };

    geocode();
  }, [pickup, dropoff, mapStart, mapEnd, rideStartCoords, rideDropCoords, yourloc]);

  const rideDetails = {
    passenger: {
      name: data && data.passenger ? data.passenger : (user && user.firstname) || (caption && caption.firstname) || localStorage.getItem("passengerName") || "Passenger",
      rating: "4.8",
      image: data && data.passengerImg ? data.passengerImg : "https://i.pinimg.com/originals/5d/a8/76/5da8768c07eb3db7dbf5f394ab4444a6.jpg",
    },
    trip: {
      pickup,
      dropoff,
      distance: "5.2 mi",
      time: "18 min",
      fare: `$${fare}`,
    },
    car: {
      model: "Toyota Camry",
      color: (caption && caption.vechicle && caption.vechicle.color) || "Black",
      license: (caption && caption.vechicle && caption.vechicle.plate) || "ABC-1234",
    },
  };

  const handleArrived = () => {
    socket.emit("captionarrived", {});
    setRideStatus("arrived");
  };
  const handleStartTrip = () => {
    const savedOtp = localStorage.getItem("rideotp");
    if (otp === savedOtp) {
      setOtpError(false);
      socket.emit("tripstarted", { otp });
      localStorage.removeItem("rideotp");
      setRideStatus("on-trip");
    } else {
      setOtpError(true);
    }
  };
  const handleCompleteTrip = () => {
    socket.emit("tripcompleted", { fare });
    setShowFinishScreen(true);
  };
  const handleFinishRide = () => {
    socket.emit("rideFinished", {});
    setRideStatus("completed");
    navigate("/captionhome")
    setShowFinishScreen(false);
  };

  if (showFinishScreen) {
    return (
      <div className="w-full h-screen bg-black flex flex-col justify-between p-6">
        <div className="flex flex-col items-center mt-20">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-green-500/20">
            <i className="ri-check-line text-5xl text-white"></i>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Ride Completed</h2>
          <p className="text-gray-400">Collect {rideDetails.trip.fare} from passenger</p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 mb-4 border border-zinc-800">
            <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                <span className="text-gray-400">Earnings</span>
                <span className="text-2xl font-bold text-white">{rideDetails.trip.fare}</span>
            </div>
            <div className="flex justify-between items-center py-3">
                <span className="text-gray-400">Trip Duration</span>
                <span className="text-white">{rideDetails.trip.time}</span>
            </div>
            <button
              onClick={handleFinishRide}
              className="w-full bg-white text-black py-4 rounded-2xl font-bold text-lg mt-6 hover:bg-gray-200 transition"
            >
              Finish & Go Online
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-white overflow-hidden">
      {/* Map Section */}
      <div className="relative h-[40%] w-full">
        <UberMap set1cordinates={mapStart} set2cordinates={mapEnd} />
        
        {/* Top Header Over Map */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <button className="bg-white p-2 rounded-full shadow-lg">
                <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div className="bg-black px-4 py-2 rounded-full shadow-lg">
                <p className="text-white text-sm font-semibold uppercase tracking-wider">
                    {rideStatus.replace('-', ' ')}
                </p>
            </div>
            <button className="bg-white p-2 rounded-full shadow-lg">
                <i className="ri-error-warning-line text-xl text-red-500"></i>
            </button>
        </div>
      </div>

      {/* Ride Details Drawer */}
      <div className="flex-1 bg-white rounded-t-[32px] -mt-8 relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] overflow-y-auto px-6 pt-8 pb-4">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>

        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <img src="https://www.google.com/imgres?q=driver&imgurl=https%3A%2F%2Fdrivingtoindependence.com%2Fwp-content%2Fuploads%2F2023%2F07%2F27_Mid-Aged-Man-min-1-1024x682.jpg&imgrefurl=https%3A%2F%2Fdrivingtoindependence.com%2Fthe-importance-of-being-a-skilled-driver%2F&docid=b6mSuzcXn51UmM&tbnid=-1udfmAflqWRnM&vet=12ahUKEwjwxYfNhpiTAxX5aCoJHWU0BXMQnPAOegQINxAB..i&w=1024&h=682&hcb=2&ved=2ahUKEwjwxYfNhpiTAxX5aCoJHWU0BXMQnPAOegQINxAB" className="w-14 h-14 rounded-full object-cover" alt="" />
                <div>
                    <h3 className="text-xl font-bold text-gray-900">{rideDetails.passenger.name}</h3>
                    <div className="flex items-center text-sm font-semibold text-gray-500">
                        <i className="ri-star-s-fill text-yellow-500 mr-1"></i> {rideDetails.passenger.rating}
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <button className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <i className="ri-message-3-fill text-xl"></i>
                </button>
                <button className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="ri-phone-fill text-xl text-blue-600"></i>
                </button>
            </div>
        </div>

        <div className="space-y-6">
            <div className="flex gap-4">
                <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <div className="w-[2px] flex-1 bg-gray-100 my-1"></div>
                    <div className="w-3 h-3 bg-black"></div>
                </div>
                <div className="flex-1 space-y-4">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pickup</p>
                        <p className="text-gray-800 font-medium leading-tight">{pickup}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Drop-off</p>
                        <p className="text-gray-800 font-medium leading-tight">{dropoff}</p>
                    </div>
                </div>
            </div>

            {rideStatus === "arrived" && (
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <p className="text-sm font-semibold text-gray-600 mb-3 text-center">Enter Ride PIN from Passenger</p>
                    <input 
                        className={`w-full bg-white border py-4 rounded-xl text-center text-3xl font-black tracking-[1em] outline-none transition ${
                          otpError ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-black"
                        }`}
                        maxLength={4}
                        placeholder="••••"
                        value={otp}
                        onChange={(e) => { setOtp(e.target.value); setOtpError(false); }}
                    />
                    {otpError && (
                      <p className="text-red-500 text-sm text-center mt-2 font-semibold">Incorrect OTP. Please try again.</p>
                    )}
                </div>
            )}

              {rideStatus === "on-trip" && (
                <div className="bg-green-50 p-4 rounded-2xl border-2 border-green-500 text-center">
                  <p className="text-lg font-black text-green-700">Trip Started</p>
                  <p className="text-sm text-green-600 mt-1">Passenger OTP verified successfully.</p>
                </div>
              )}

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                        <i className="ri-wallet-3-line text-xl"></i>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Fare</p>
                        <p className="text-lg font-bold text-gray-900">{rideDetails.trip.fare}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500 font-bold uppercase">Payment</p>
                    <p className="text-sm font-bold text-gray-900 uppercase">Cash</p>
                </div>
            </div>

            <div className="flex gap-3">
                {rideStatus === "picking-up" && (
                    <button onClick={handleArrived} className="flex-1 bg-black text-white py-4 rounded-2xl font-bold hover:bg-zinc-800 active:scale-95 transition">I've Arrived</button>
                )}
                {rideStatus === "arrived" && (
                    <button onClick={handleStartTrip} disabled={otp.length !== 4} className="flex-1 bg-black text-white py-4 rounded-2xl font-bold disabled:bg-gray-300 transition">Verify &amp; Start Ride</button>
                )}
                {rideStatus === "on-trip" && (
                  <button onClick={handleCompleteTrip} className="flex-1 bg-black text-white py-4 rounded-2xl font-bold transition">Reached Destination</button>
                )}
                
                <button className="flex-1 bg-gray-100 text-gray-900 py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
                    <i className="ri-navigation-line"></i>
                    Navigate
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Captionriding;