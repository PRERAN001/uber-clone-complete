import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Usercontext } from "../src/context/Usecontext";
import car from "../src/assets/car.png";
import auto from "../src/assets/auto.png";
import bike from "../src/assets/bike.png";
import socket from "../src/utils/socket";
const Allocateddriver = ({
  setdfound,
  setwdriver,
  valuepick,
  valuedrop,
}) => {
  const { Price, vechicle } = useContext(Usercontext);
  const [otp, setotp] = useState(null);
  const [tripStarted, setTripStarted] = useState(false);
  const [tripCompleted, setTripCompleted] = useState(false);
  const [paymentFare, setPaymentFare] = useState(null);
  const [reqaccepeted, setreqaccepeted] = useState();

  useEffect(() => {
    const handleRideAccepted = (data) => {
      setreqaccepeted(data);
      setwdriver(true);
      setdfound(true);
      // Generate OTP for this ride and store it
      const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
      setotp(generatedOtp);
      localStorage.setItem("rideotp", generatedOtp);
    };

    const handleTripStarted = () => {
      setotp(null);
      localStorage.removeItem("rideotp");
      setTripStarted(true);
    };

    const handleTripCompleted = (data = {}) => {
      setTripCompleted(true);
      setTripStarted(false);
      setotp(null);
      localStorage.removeItem("rideotp");
      if (data?.fare != null) {
        setPaymentFare(data.fare);
      }
    };

    socket.on("rideacceptedbydriver", handleRideAccepted);
    socket.on("tripstarted", handleTripStarted);
    socket.on("tripcompleted", handleTripCompleted);

    return () => {
      socket.off("rideacceptedbydriver", handleRideAccepted);
      socket.off("tripstarted", handleTripStarted);
      socket.off("tripcompleted", handleTripCompleted);
    };
  }, [setdfound, setwdriver]);
  let v = car;
  if (vechicle == "auto") {
    v = auto;
  } else if (vechicle == "bike") {
    v = bike;
  } else {
    v = car;
  }
  return (
    <div className="w-full h-full">
      <div
        className="text-3xl font-semibold mb-2 ml-1 cursor-pointer"
        onClick={() => {
          setdfound(false);
          setwdriver(false);
        }}
      >
        <i className="ri-arrow-down-s-line"></i>
      </div>

      <h3 className="text-2xl font-bold ml-1 mb-4">
        {tripCompleted ? "Reached Destination" : tripStarted ? "Trip Started" : "Your driver is arriving"}
      </h3>

      <div className="w-full bg-white rounded-2xl p-4 shadow-md mb-4 flex items-center gap-4">
        <img
          src="https://media.ride.guru/uploads/1632247273553.png"
          alt="driver"
          className="h-16 w-16 rounded-full object-cover"
        />

        <div className="flex-1">
          <h4 className="font-semibold text-lg">
            {reqaccepeted?.driver || "Rahul Sharma"}
          </h4>
          <p className="text-gray-500 text-sm">⭐ 4.92 • 2,310 trips</p>
        </div>

        <div className="text-right">
          <p className="font-semibold">
            {reqaccepeted?.vechicle || "KA 03 AB 4421"}
          </p>
          <p className="text-gray-500 text-sm">
            {reqaccepeted?.vechicleType || "WagonR • Silver"}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center mt-3 mb-5">
        <div className="h-4 w-4 rounded-full bg-black animate-ping"></div>
        <p className="text-gray-600 text-sm mt-2">
          Driver arriving in {reqaccepeted?.time || "3–5"} min
        </p>
      </div>

      {otp && !tripStarted && (
        <div className="w-full bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-4 mb-4 text-center">
          <p className="text-sm font-semibold text-yellow-700 mb-1">Your Ride OTP</p>
          <p className="text-5xl font-black tracking-[0.3em] text-yellow-600">{otp}</p>
          <p className="text-xs text-yellow-600 mt-1">Share this with your driver to start the ride</p>
        </div>
      )}

      {tripStarted && (
        <div className="w-full bg-green-50 border-2 border-green-500 rounded-2xl p-4 mb-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <i className="ri-check-line text-white text-lg"></i>
            </div>
            <p className="text-xl font-black text-green-700">Trip Started!</p>
          </div>
          <p className="text-sm text-green-600">Your driver has started the ride. Enjoy your trip!</p>
        </div>
      )}

      {tripCompleted && (
        <div className="w-full bg-blue-50 border-2 border-blue-500 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-lg font-black text-blue-700">Payment Details</p>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">Cash</span>
          </div>
          <div className="flex justify-between items-center border-t border-blue-200 pt-3">
            <p className="text-blue-600 font-semibold">Amount to Pay</p>
            <p className="text-2xl font-black text-blue-800">₹{paymentFare ?? Price}.00</p>
          </div>
          <p className="text-xs text-blue-600 mt-2">Please pay the driver and complete your trip.</p>
        </div>
      )}

      <div className="flex flex-col items-center gap-6">
        <img className="h-24 drop-shadow-md" src={v} alt={vechicle} />

        <div className="w-full bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-black/80 text-white rounded-full flex items-center justify-center">
              <i className="ri-map-pin-fill"></i>
            </div>
            <div>
              <h5 className="font-semibold text-lg">Pickup Location</h5>
              <p className="text-sm text-gray-500">{valuepick}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-black/80 text-white rounded-full flex items-center justify-center">
              <i className="ri-map-pin-2-line"></i>
            </div>
            <div>
              <h5 className="font-semibold text-lg">Drop Location</h5>
              <p className="text-sm text-gray-500">{valuedrop}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black/80 text-white rounded-full flex items-center justify-center">
              <i className="ri-cash-line"></i>
            </div>
            <div>
              <h5 className="font-semibold text-lg">Price</h5>
              <p className="text-sm text-gray-500">₹{Price}.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allocateddriver;
