import React, { useState } from "react";
import { Link } from "react-router-dom";

const Captionriding = () => {
  const [rideStatus, setRideStatus] = useState("picking-up");
  const [otp, setOtp] = useState("");
  const [showFinishScreen, setShowFinishScreen] = useState(false);
  
  const rideDetails = {
    passenger: {
      name: "BOPPA",
      rating: "4.9",
      image: "https://i.pinimg.com/originals/5d/a8/76/5da8768c07eb3db7dbf5f394ab4444a6.jpg"
    },
    trip: {
      pickup: "123 Main St, San Francisco",
      dropoff: "456 Market St, San Francisco",
      distance: "5.2 mi",
      time: "18 min",
      fare: "$24.75"
    },
    car: {
      model: "Toyota Camry",
      color: "Black",
      license: "7ABC123"
    }
  };

  const handleArrived = () => {
    setRideStatus("arrived");
  };

  const handleStartTrip = () => {
    if (otp === "1234") {
      setRideStatus("on-trip");
    }
  };

  const handleCompleteTrip = () => {
    setShowFinishScreen(true);
  };

  const handleFinishRide = () => {
    setRideStatus("completed");
    setShowFinishScreen(false);
  };

  if (showFinishScreen) {
    return (
      <div className="w-full h-screen flex flex-col">
        <div className="flex-1 relative">
          <div className="absolute inset-0">
            <img
              src="https://d1a3f4spazzrp4.cloudfront.net/uber-com/1.1.8/d1a3f4spazzrp4.cloudfront.net/images/facebook-shareimage-1-c3462391c9.jpg"
              alt="Completed Ride"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6">
              <span className="text-black text-3xl font-bold">✓</span>
            </div>
            
            <h2 className="text-4xl font-bold text-white text-center mb-2">Trip Completed</h2>
            <p className="text-gray-300 text-center mb-10">You've arrived at the destination</p>
            
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-300">Trip fare</p>
                  <p className="text-white text-2xl font-bold">{rideDetails.trip.fare}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-300">Distance</p>
                  <p className="text-white font-medium">{rideDetails.trip.distance}</p>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-300">Duration</p>
                  <p className="text-white font-medium">{rideDetails.trip.time}</p>
                </div>
              </div>
              
              <div className="space-y-4 mt-8">
                <button
                  onClick={handleFinishRide}
                  className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
                >
                  Finish Ride
                </button>
                <button className="w-full bg-transparent text-white py-4 rounded-xl font-semibold border border-white hover:bg-white/10 transition">
                  Contact Support
                </button>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-center text-gray-400 text-sm">
                Rate your passenger after finishing the ride
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-gray-900">
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gray-800">
          <img
            src="https://img.olhardigital.com.br/wp-content/uploads/2018/09/20180918182749.jpg"
            alt="Map View"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="bg-black/70 backdrop-blur-sm p-6 rounded-2xl">
              <div className="text-5xl mb-4"><i className="ri-map-pin-line"></i></div>
              <p className="text-white text-xl font-semibold">Live Map View</p>
              <p className="text-gray-300 mt-2">Real-time navigation active</p>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0 p-4">
          <div className="flex justify-between items-center">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">U</span>
            </div>
            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <p className="text-gray-900 font-medium">
                {rideStatus === "picking-up" ? "Pick up passenger" : 
                 rideStatus === "arrived" ? "Start trip" : 
                 rideStatus === "on-trip" ? "On trip" : "Trip completed"}
              </p>
            </div>
            <div className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl"><i className="ri-notification-4-fill"></i></span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[45%] min-h-[350px] overflow-y-auto">
        <div className="bg-white shadow-2xl h-full">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 truncate">{rideDetails.passenger.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-yellow-500"><i className="ri-star-s-fill"></i></span>
                  <span className="text-gray-600">{rideDetails.passenger.rating}</span>
                </div>
              </div>
              <img
                src={rideDetails.passenger.image}
                alt="Passenger"
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0 ml-4"
              />
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center pt-1 flex-shrink-0">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="w-0.5 h-8 bg-gray-300 my-1"></div>
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-4">
                    <p className="text-gray-500 text-xs font-medium uppercase mb-1">PICKUP</p>
                    <p className="text-gray-900 font-medium truncate">{rideDetails.trip.pickup}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase mb-1">DROP-OFF</p>
                    <p className="text-gray-900 font-medium truncate">{rideDetails.trip.dropoff}</p>
                  </div>
                </div>
              </div>
            </div>

            {rideStatus === "arrived" && (
              <div className="mb-6">
                <div className="mb-4">
                  <p className="text-gray-900 font-medium mb-2">Enter passenger's OTP to start ride</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 4-digit OTP"
                      className="flex-1 bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 text-center text-lg font-bold tracking-widest"
                      maxLength={4}
                    />
                  </div>
                  <p className="text-gray-500 text-sm mt-2">Ask passenger for the 4-digit code</p>
                </div>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl"><i className="ri-car-line"></i></span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-medium truncate">{rideDetails.car.model}</p>
                  <p className="text-gray-500 text-sm truncate">{rideDetails.car.color} • {rideDetails.car.license}</p>
                </div>
              </div>
              <div className="h-px bg-gray-200"></div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-gray-500 text-xs">Distance</p>
                <p className="text-gray-900 font-medium">{rideDetails.trip.distance}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-gray-500 text-xs">Time</p>
                <p className="text-gray-900 font-medium">{rideDetails.trip.time}</p>
              </div>
            </div>

            <div className="space-y-3">
              {rideStatus === "picking-up" && (
                <button
                  onClick={handleArrived}
                  className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition active:scale-[0.98]"
                >
                  I've arrived
                </button>
              )}
              
              {rideStatus === "arrived" && (
                <button
                  onClick={handleStartTrip}
                  className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={otp.length !== 4}
                >
                  Start ride
                </button>
              )}
              
              {rideStatus === "on-trip" && (
                <button
                  onClick={handleCompleteTrip}
                  className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition active:scale-[0.98]"
                >
                  Complete trip
                </button>
              )}
              
              {rideStatus === "completed" && (
                <Link
                  to="/home"
                  className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition active:scale-[0.98] flex items-center justify-center"
                >
                  Return to home
                </Link>
              )}
              
              <button className="w-full bg-white text-gray-900 py-3 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition active:scale-[0.98]">
                {rideStatus === "picking-up" ? "Contact passenger" : 
                 rideStatus === "arrived" ? "Cancel trip" : 
                 rideStatus === "on-trip" ? "Navigate" : "Contact support"}
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 text-sm">Trip fare</p>
                <p className="text-gray-900 font-bold text-lg">{rideDetails.trip.fare}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Captionriding;