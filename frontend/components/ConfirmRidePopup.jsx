import React from "react";
import { Link, useNavigate } from "react-router-dom";
import socket from "../src/utils/socket";

const ConfirmRidePopup = ({ setShowPopup, setShowConfirmPopup, ridepopupdata = {} }) => {
  const navigate = useNavigate();
  const data = ridepopupdata || {};

  function handleConfirm() {
    const payload = {
      ride: data,
    };

    // keep typo event for backward compatibility + corrected event name
    socket.emit("ridefinallyaccepetd", payload);
    socket.emit("rideFinallyAccepted", payload);

    if (typeof setShowPopup === "function") setShowPopup(false);
    if (typeof setShowConfirmPopup === "function") setShowConfirmPopup(false);
    navigate('/captionriding');
  }

  const pickup = data?.pickup || "Union Square, San Francisco";
  const dropoff = data?.drop || data?.dropoff || "International Terminal";
  const fare = data?.fare ?? "20.00";

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Confirm your ride
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Review trip details before confirming
          </p>
        </div>
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-full flex items-center justify-center ml-4">
          <span className="text-white font-bold text-base sm:text-lg">U</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex flex-col items-center pt-1 shrink-0">
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <div className="w-0.5 h-8 sm:h-10 bg-gray-300 my-1"></div>
            <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="mb-6 sm:mb-8">
              <p className="text-gray-500 text-xs font-medium uppercase mb-1">
                Pickup
              </p>
              <p className="text-gray-900 font-medium text-base sm:text-lg truncate">
                {pickup}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">
                Pickup in 3 minutes
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase mb-1">
                Drop-off
              </p>
              <p className="text-gray-900 font-medium text-base sm:text-lg truncate">
                {dropoff}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">
                International Terminal
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-lg sm:text-xl">
                <i className="ri-roadster-line"></i>
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-gray-900 font-medium truncate">UberX</p>
              <p className="text-gray-500 text-xs sm:text-sm truncate">
                Affordable, everyday rides
              </p>
            </div>
          </div>
          <p className="text-gray-900 text-lg sm:text-xl font-bold ml-4 shrink-0">
            ${fare}
          </p>
        </div>
        <div className="h-px bg-gray-200 mb-3 sm:mb-4"></div>
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-gray-600">3 passengers</span>
          <span className="text-gray-600">25 min</span>
          <span className="text-gray-600">14 mi</span>
        </div>
      </div>

      <div className="mb-6 p-3 sm:p-4 bg-gray-100 rounded-xl sm:rounded-2xl">
        <div className="flex items-center justify-between mb-3">
          <p className="text-gray-900 font-medium text-sm sm:text-base">
            Payment method
          </p>
          <button className="text-black font-medium text-xs sm:text-sm">
            Change
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center shrink-0">
            <span className="text-white text-base sm:text-lg">
              <i className="ri-visa-line"></i>
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-gray-900 font-medium text-sm sm:text-base truncate">
              •••• 4242
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">Visa</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <button onClick={handleConfirm} className="w-full inline-flex items-center justify-center bg-black text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-900 transition active:scale-[0.98]">
          Confirm UberX
        </button>
        <Link to="/captionhome"
          className="w-full inline-flex items-center justify-center bg-white text-gray-900 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold border border-gray-300 text-sm sm:text-base hover:bg-gray-50 transition active:scale-[0.98]"
          onClick={() => setShowPopup(false)}
        >
          Cancel
        </Link>
      </div>

      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
        <p className="text-center text-gray-500 text-xs sm:text-sm">
          By confirming, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
