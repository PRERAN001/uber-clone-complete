import React, { useEffect, useState } from "react";
import { useContext } from 'react'
import { Usercontext } from '../src/context/Usecontext'
import car from "../src/assets/car.png"
import auto from "../src/assets/auto.png"
import bike from "../src/assets/bike.png"
import socket from "../src/utils/socket";
const Allocateddriver = ({ setdfound ,wdriver,setwdriver,valuepick,valuedrop}) => {
    const {Price,setPrice,vechicle}=useContext(Usercontext)
    const [reqaccepeted,setreqaccepeted]=useState()
    
    useEffect(() => {
      const handleRideAccepted = (data) => {
        console.log("Driver accepted ride:", data);
        setreqaccepeted(data);
        setwdriver(true);
        setdfound(true);
      };
      
      socket.on("rideacceptedbydriver", handleRideAccepted);
      
      return () => {
        socket.off("rideacceptedbydriver", handleRideAccepted);
      };
    }, [setdfound, setwdriver]);
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
  return (
    <div className="w-full h-full">

      <div
        className="text-3xl font-semibold mb-2 ml-1 cursor-pointer"
        onClick={()=>{
          setdfound(false)
          setwdriver(false)
        }}
      >
        <i className="ri-arrow-down-s-line"></i>
      </div>

      <h3 className="text-2xl font-bold ml-1 mb-4">Your driver is arriving</h3>

      
      <div className="w-full bg-white rounded-2xl p-4 shadow-md mb-4 flex items-center gap-4">
        <img
          src="https://media.ride.guru/uploads/1632247273553.png"
          alt="driver"
          className="h-16 w-16 rounded-full object-cover"
        />

        <div className="flex-1">
          <h4 className="font-semibold text-lg">{reqaccepeted?.driver || "Rahul Sharma"}</h4>
          <p className="text-gray-500 text-sm">⭐ 4.92 • 2,310 trips</p>
        </div>

        <div className="text-right">
          <p className="font-semibold">{reqaccepeted?.vechicle || "KA 03 AB 4421"}</p>
          <p className="text-gray-500 text-sm">{reqaccepeted?.vechicleType || "WagonR • Silver"}</p>
        </div>
      </div>

      
      <div className="flex flex-col items-center mt-3 mb-5">
        <div className="h-4 w-4 rounded-full bg-black animate-ping"></div>
        <p className="text-gray-600 text-sm mt-2">Driver arriving in {reqaccepeted?.time || "3–5"} min</p>
      </div>

      
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
              <p className="text-sm text-gray-500">₹{Price}.00</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Allocateddriver;
