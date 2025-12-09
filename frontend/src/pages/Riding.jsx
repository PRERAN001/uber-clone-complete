import React from "react";
import { useNavigate } from "react-router-dom";
const Riding = () => {
        const navigate = useNavigate();
        function nav(){
            navigate("/start");
        }
  return (
    <div className="w-full h-screen relative bg-gray-100">
      <div className="w-full h-[45%] relative">
        <img
          className="w-full h-full object-cover"
          src="https://img.olhardigital.com.br/wp-content/uploads/2018/09/20180918182749.jpg"
          alt=""
        />

        
        <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow" onClick={nav}>
          <i className="ri-home-gear-line text-2xl"></i>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white p-5 rounded-t-3xl shadow-2xl">
        <div className="flex justify-center -mt-12 mb-3">
          <img
            className="h-24 drop-shadow-xl"
            src="https://tse4.mm.bing.net/th/id/OIP.ymjpxr4RPlwbLenCbbpYywHaE7?pid=Api&P=0&h=180"
            alt="car"
          />
        </div>

        <div className="w-full bg-white rounded-2xl p-4 shadow-md mb-4">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-black/80 text-white rounded-full flex items-center justify-center">
              <i className="ri-map-pin-fill"></i>
            </div>
            <div>
              <h5 className="font-semibold text-lg">Pickup Location</h5>
              <p className="text-sm text-gray-500">123 Main St, Anytown, USA</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-black/80 text-white rounded-full flex items-center justify-center">
              <i className="ri-map-pin-2-line"></i>
            </div>
            <div>
              <h5 className="font-semibold text-lg">Drop Location</h5>
              <p className="text-sm text-gray-500">456 Main St, Anytown, USA</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black/80 text-white rounded-full flex items-center justify-center">
              <i className="ri-cash-line"></i>
            </div>
            <div>
              <h5 className="font-semibold text-lg">Price</h5>
              <p className="text-sm text-gray-500">$20.00</p>
            </div>
          </div>
        </div>

        <button className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold shadow-lg active:scale-95 transition">
          Make a payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
