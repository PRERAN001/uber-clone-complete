import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen bg-black">
      
      <div
        className='relative w-full h-full bg-cover bg-center'
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=60")',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        
        <div className="relative z-20 px-5 py-6 flex justify-between items-center">
          <img
            className="w-24"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-Logo-Transparent-Background.png"
            alt="Uber"
          />

          <Link
            to="/userlogin"
            className="text-white bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm"
          >
            Login
          </Link>
        </div>

        
        <div className="absolute bottom-0 w-full px-5 pb-10">
          <div className="bg-white w-full rounded-3xl shadow-xl px-6 py-8 flex flex-col gap-5">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold text-black">Get a ride</h1>
              <p className="text-gray-600 text-sm mt-1">
                Fast • Safe • Affordable
              </p>
            </div>

            
            <div className="w-full bg-gray-100 rounded-2xl px-4 py-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-black rounded-full flex justify-center items-center text-white">
                <span className="text-lg">⌕</span>
              </div>
              <p className="text-gray-700 text-base font-medium">
                Where to?
              </p>
            </div>

            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl">
                  <i className="ri-car-fill"></i>
                </div>
                <p className="text-xs mt-1 font-semibold">Uber Go</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl">
                  <i className="ri-roadster-fill"></i>
                </div>
                <p className="text-xs mt-1 font-semibold">Uber Premier</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl">
                  <i className="ri-motorbike-fill"></i>
                </div>
                <p className="text-xs mt-1 font-semibold">Moto</p>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to="/userlogin"
              className="bg-black text-white w-full py-3 rounded-xl text-center font-semibold text-lg"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
