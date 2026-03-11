import React from 'react'
import { useContext } from 'react'
import { captioncontext } from '../context/Captioncontext'

const Captiondetails = ({online,setonline}) => {
  const {caption}=useContext(captioncontext)
  return (
    <div>
        <div className="flex flex-col items-center">
          <img
            className="h-20 w-20 rounded-full object-cover shadow-lg border-4 border-white mt-1"
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
            alt=""
          />

          <h2 className="text-xl font-semibold mt-2">{caption.name}</h2>
          <p className="text-gray-500 text-xs">Professional Caption Driver</p>
        </div>
        

        <div className="bg-gray-50 rounded-2xl p-5 shadow-inner border border-gray-100 mb-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-lg">
              <i className="ri-car-fill"></i>
            </div>
            <div>
              <h4 className="text-base font-semibold">Vehicle Deatils</h4>
              <p className="text-gray-500 text-xs">T{caption.vechicle.color} · {caption.vechicle.vechiletype} · {caption.vechicle.plate}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-lg">
              <i className="ri-star-smile-fill"></i>
            </div>
            <div>
              <h4 className="text-base font-semibold">Rating</h4>
              <p className="text-gray-500 text-xs">4.89 · 820 Rides</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-lg">
              <i className="ri-phone-fill"></i>
            </div>
            <div>
              <h4 className="text-base font-semibold">Contact</h4>
              <p className="text-gray-500 text-xs">+1 987 654 3210</p>
            </div>
          </div>
        </div>

        <button className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold shadow-xl active:scale-95 transition" onClick={()=>{
          setonline(!online)
        }}>
          {online?"Go Offline":"Go Online"} 
        </button>
    </div>
  )
}

export default Captiondetails
