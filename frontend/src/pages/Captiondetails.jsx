import React from 'react'

const Captiondetails = ({online,setonline}) => {
  return (
    <div>
        <div className="flex flex-col items-center">
          <img
            className="h-20 w-20 rounded-full object-cover shadow-lg border-4 border-white mt-1"
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
            alt=""
          />

          <h2 className="text-xl font-semibold mt-2">John Carter</h2>
          <p className="text-gray-500 text-xs">Professional Caption Driver</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5 mb-6">
          <div className="bg-gray-100 p-3 rounded-xl text-center shadow-inner border border-gray-200">
            <h3 className="text-lg font-semibold">$185</h3>
            <p className="text-gray-500 text-xs">Earned</p>
          </div>

          <div className="bg-gray-100 p-3 rounded-xl text-center shadow-inner border border-gray-200">
            <h3 className="text-lg font-semibold">6.4h</h3>
            <p className="text-gray-500 text-xs">Online</p>
          </div>

          <div className="bg-gray-100 p-3 rounded-xl text-center shadow-inner border border-gray-200">
            <h3 className="text-lg font-semibold">82km</h3>
            <p className="text-gray-500 text-xs">Distance</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 shadow-inner border border-gray-100 mb-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-lg">
              <i className="ri-car-fill"></i>
            </div>
            <div>
              <h4 className="text-base font-semibold">Vehicle</h4>
              <p className="text-gray-500 text-xs">Toyota Camry · Black · KA 09 M 4521</p>
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
