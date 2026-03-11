import React from "react";
import socket from "../utils/socket";
import { captioncontext } from "../context/Captioncontext";
import { useContext } from "react";
import {Usercontext} from "../context/Usecontext.jsx"
const Ridepopup = ({ setShowPopup, setShowConfirmPopup, ridepopupdata = {} }) => {
  const { caption } = useContext(captioncontext);
  const { setinvitieacc } = useContext(Usercontext)
  const data = ridepopupdata && Object.keys(ridepopupdata).length ? ridepopupdata : {};
    const ride = {
      pickup: data.valuepick || "",
      drop: data.valuedrop || "",
      fare: data.Price || 0,
      distance: data.distance || "",
      time: data.time || "",
      passenger: data.user || "",
      passengerImg: data.userImg || "https://randomuser.me/api/portraits/women/68.jpg",
      driver: caption.firstname || "Unknown Driver",
      driverImg: caption.vechicle?.color || "https://www.google.com/imgres?q=driver&imgurl=https%3A%2F%2Fwww.rajasthantourdriver.com%2Fwp-content%2Fuploads%2F2023%2F07%2Findiacar.jpg&imgrefurl=https%3A%2F%2Fwww.rajasthantourdriver.com%2Findia%2Fhiring-a-car-and-driver-in-india%2F&docid=cG7k1ocyjEKeyM&tbnid=igMLQW2nNxva_M&vet=12ahUKEwjwxYfNhpiTAxX5aCoJHWU0BXMQnPAOegQIHxAB..i&w=1000&h=667&hcb=2&ved=2ahUKEwjwxYfNhpiTAxX5aCoJHWU0BXMQnPAOegQIHxAB",
      vehicleType: caption.vechicle?.vechicletype || "Unknown Vehicle",
      vehiclePlate: caption.vechicle?.plate || "Unknown Plate",
      driverId: localStorage.getItem("driverid") || "Unknown Driver ID",
      pickupCoords: data.pickupCoords || null,
      dropCoords: data.dropCoords || null,
    };

  const handleAccept = () => {
    setShowPopup(false);
    setShowConfirmPopup(true);
    setinvitieacc(false)
    
    const driverId = localStorage.getItem("driverid");

    socket.emit("rideaccepted", {
      ride,
      driverId: driverId,
    });
  };

  const handleDecline = () => {
    setShowPopup(false);
    setShowConfirmPopup(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={ride.passengerImg}
          alt="Passenger"
          className="w-16 h-16 rounded-full object-cover shadow-md border border-gray-300"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{ride.passenger}</h2>
          <p className="text-gray-500 text-sm">{ride.distance} · {ride.time}</p>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-4 h-4 bg-black rounded-full"></div>
          <div className="flex-1">
            <p className="text-gray-700 font-medium text-sm">Pickup</p>
            <p className="text-gray-900">{ride.pickup}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
          <div className="flex-1">
            <p className="text-gray-700 font-medium text-sm">Drop-off</p>
            <p className="text-gray-900">{ride.drop}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-8 p-4 bg-gray-50 rounded-xl">
        <div>
          <p className="text-gray-700 font-medium">Estimated Fare</p>
          <p className="text-gray-500 text-sm">Includes all charges</p>
        </div>
        <p className="text-gray-900 text-2xl font-bold">{ride.fare}</p>
      </div>
      <div className="flex gap-4">
        <button
          className="flex-1 bg-gray-100 text-gray-900 py-4 rounded-xl font-semibold hover:bg-gray-200 transition active:scale-95"
          onClick={handleDecline}
        >
          Decline
        </button>
        <button
          className="flex-1 bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition active:scale-95"
          onClick={handleAccept}
        >
          Accept Ride
        </button>
      </div>
    </div>
  );
};

export default Ridepopup;