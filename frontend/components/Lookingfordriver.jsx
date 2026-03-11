import React from 'react'
import { useContext } from 'react'
import { Usercontext } from '../src/context/Usecontext'
import car from "../src/assets/car.png"
import auto from "../src/assets/auto.png"
import bike from "../src/assets/bike.png"
import socket from "../src/utils/socket"
const Lookingfordriver = ({setdfound,vfound,setride,valuepick,valuedrop, setwdriver}) => {
  const {Price, vechicle, user, invitieacc, setinvitieacc} = useContext(Usercontext)
  let v=car
    if(vechicle=="auto"){
      v=auto
    }
    else if(vechicle=="bike"){
      v=bike
    }
    else {
      v=car
    }
   
  const readCoords = (key) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && parsed.latitude != null && parsed.longitude != null) return parsed;
      return null;
    } catch { return null; }
  };

  const data = {
    valuepick,
    valuedrop,
    Price,
    vechicle,
    user: user && user.firstname ? `${user.firstname} ${user.lastname}` : "Unknown User",
    driverId: localStorage.getItem("driverid"),
    pickupCoords: readCoords("ridePickupCoords"),
    dropCoords: readCoords("rideDropCoords"),
  };

  function senddata(){
    setinvitieacc(true)
    setwdriver(false)
    socket.emit('lookingfordriver',data)
  }
  
  return (
    <div>
      <div
        className="text-3xl font-semibold mb-2 ml-1 cursor-pointer"
        onClick={() => {
          
          setdfound(false)
        }}
      >
        <i className="ri-arrow-down-s-line"></i>
      </div>

      <h3 className="text-2xl font-bold mb-6 ml-1">Confirm your ride</h3>

      <div className="flex flex-col items-center gap-6">
        <img
          className="h-24 drop-shadow-md"
          src={v}
          alt={vechicle}
        />

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
              <p className="text-sm text-gray-500">${Price}</p>
            </div>
          </div>
        </div>
        <button onClick={()=>{
          senddata()
        }} className="w-full bg-black text-white py-3 rounded-2xl font-bold text-lg">
          Find a driver
        </button>

        
      </div>
    </div>
  )
}

export default Lookingfordriver
