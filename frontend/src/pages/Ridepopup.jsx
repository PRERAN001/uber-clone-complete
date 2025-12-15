import React,{useState,useEffect} from "react";
import socket from "../utils/socket";
import { captioncontext } from "../context/Captioncontext";
import { useContext } from "react";
import {Usercontext} from "../context/Usecontext.jsx"
const Ridepopup = ({ setShowPopup, setShowConfirmPopup, ridepopupdata = {} }) => {
  const [data, setData] = useState({});
  const { caption } = useContext(captioncontext);
  const {invitieacc,setinvitieacc}=useContext(Usercontext)

  useEffect(() => {
    if (ridepopupdata && Object.keys(ridepopupdata).length) {
      setData(ridepopupdata);
      console.log("Ridepopup received data:", ridepopupdata);
      console.log("Driver context (caption):", caption);
    }
  }, [ridepopupdata, caption]);
    const ride = {
      pickup: data.valuepick || "",
      drop: data.valuedrop || "",
      fare: data.Price || 0,
      distance: data.distance || "",
      time: data.time || "",
      passenger: data.user || "",
      passengerImg: data.userImg || "https://randomuser.me/api/portraits/women/68.jpg",
      driver: caption.firstname || "Unknown Driver",
      driverImg: caption.vechicle?.color || "https://randomuser.me/api/portraits/men/68.jpg",
      vehicleType: caption.vechicle?.vechicletype || "Unknown Vehicle",
      vehiclePlate: caption.vechicle?.plate || "Unknown Plate",
      driverId: localStorage.getItem("driverid") || "Unknown Driver ID",
    };

  const handleAccept = () => {
    setShowPopup(false);
    setShowConfirmPopup(true);
    setinvitieacc(false)
    
    const driverId = localStorage.getItem("driverid");
    console.log("Driver accepting ride with driverId:", driverId);
    console.log("Ride data being emitted:", ride);
    
    // Emit ride acceptance with driver ID so backend can route back to passenger
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