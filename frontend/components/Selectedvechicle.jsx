import React from "react";
import { useState } from "react";
import { alocdriver } from "../src/context/allocateddrivercontext";
import { useContext } from "react";
import car from "../src/assets/car.png"
import auto from "../src/assets/auto.png"
import bike from "../src/assets/bike.png"
import { Usercontext } from "../src/context/Usecontext";
const Selectedvechicle = ({ setvechicle2 ,setride,setdfound,setwdriver,valuepick,valuedrop}) => {
  const { driverAllocated, setDriverAllocated } = useContext(alocdriver);
  const {vechicle,setvechicle,Price,setPrice}=useContext(Usercontext)
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
    <div className="">
      <div
        className="text-3xl font-semibold mb-2 ml-1 cursor-pointer"
        onClick={() => {
          setvechicle2(false)
          setride(false)
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
            setdfound(false)
            setride(false)
            setvechicle2(false)
            setDriverAllocated(false)
            setwdriver(true)
        }} className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold shadow-lg active:scale-95 transition">
          Confirm Ride
        </button>
      </div>
    </div>
  );
};

export default Selectedvechicle;
