import React, { useState } from 'react'
import car from "../src/assets/car.png"
import auto from "../src/assets/auto.png"
import bike from "../src/assets/bike.png"
import { useContext } from 'react'
import { Usercontext } from '../src/context/Usecontext'

const Vechiclepannel = ({setvechicle2,vechicle2,setride,distance,valuepick,valuedrop}) => {
  const { vechicle, setvechicle, Price, setPrice } = useContext(Usercontext)
  const images={
    car:car,
    auto:auto,
    bike:bike
  }

  let caravg=30
  let autoavg=40
  let bikeavg=20
  let cardistancetime=(distance/caravg)*60
  let autodistancetime=(distance/autoavg)*60
  let bikedistancetime=(distance/bikeavg)*60
  let carperkm=15
  let autoperkm=10
  let bikeperkm=5
  return (
    <div>
      <div className="text-2xl font-semibold mb-5 ml-2" onClick={()=>{
          setvechicle2(false)
          setride(true)
        }}><i className="ri-arrow-down-wide-fill"></i></div>
        <h3 className="text-2xl font-semibold mb-5 ml-2">Choose a Vehicle</h3>

        
        <div className="flex w-full items-center justify-between p-3 border-2 border-gray-100 active:border-black rounded-xl mb-3 hover:border-black cursor-pointer transition-all" onClick={()=>{
            setride(true)
            setvechicle2(false)
        }}>
          <img
            className="h-16 w-20 object-contain"
            src={car}
            alt="UberGo"
          />
          <div className="w-1/2 px-2" onClick={()=>{
            setvechicle("car")
            setPrice(Math.round(distance*carperkm))
          }}>
            <h4 className="font-medium text-lg flex items-center gap-2">
              UberGo
              <span className="text-sm text-gray-500 flex items-center">
                <i className="ri-user-3-fill"></i> 4
              </span>
            </h4>
            <h5 className="font-medium text-sm text-black">{Math.round(cardistancetime)} mins away</h5>
            <p className="font-normal text-xs text-gray-500">
              Affordable, compact rides
            </p>
          </div>
          <div className="text-xl font-semibold">₹{Math.round(distance*carperkm)}</div>
        </div>

        
        <div className="flex w-full items-center justify-between p-3 border-2 border-gray-100 active:border-black rounded-xl mb-3 hover:border-black cursor-pointer transition-all"onClick={()=>{
            setride(true)
            setvechicle2(false)

        }}>
          <img
            className="h-16 w-20 object-contain"
            src={bike}
            alt="Moto"
          />
          <div className="w-1/2 px-2" onClick={()=>{
            setvechicle("bike")
            setPrice(Math.round(distance*bikeperkm))
          }}>
            <h4 className="font-medium text-lg flex items-center gap-2">
              Moto
              <span className="text-sm text-gray-500 flex items-center">
                <i className="ri-user-3-fill"></i> 1
              </span>
            </h4>
            <h5 className="font-medium text-sm text-black">{Math.round(bikedistancetime)} mins away</h5>
            <p className="font-normal text-xs text-gray-500">
              Affordable motorcycle rides
            </p>
          </div>
          <div className="text-xl font-semibold">₹{Math.round(distance*bikeperkm)}</div>
        </div>

        
        <div className="flex w-full items-center justify-between p-3 border-2 border-gray-100 active:border-black rounded-xl mb-3 hover:border-black cursor-pointer transition-all"onClick={()=>{
            setride(true)
            setvechicle2(false)

        }}>
          <img
            className="h-16 w-20 object-contain"
            src={auto}
            alt="UberAuto"
          />
          <div className="w-1/2 px-2" onClick={()=>{
            setvechicle("auto")
            setPrice(Math.round(distance*autoperkm))
          }}>
            <h4 className="font-medium text-lg flex items-center gap-2">
              UberAuto
              <span className="text-sm text-gray-500 flex items-center">
                <i className="ri-user-3-fill"></i> 3
              </span>
            </h4>
            <h5 className="font-medium text-sm text-black">{Math.round(autodistancetime)} mins away</h5>
            <p className="font-normal text-xs text-gray-500">
              No bargaining, doorstep pickup
            </p>
          </div>
          <div className="text-xl font-semibold">₹{Math.round(distance*autoperkm)}</div>
        </div>
    </div>
  )
}

export default Vechiclepannel
