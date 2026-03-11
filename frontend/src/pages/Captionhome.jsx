import React from "react";
import Captiondetails from "./Captiondetails";
import Ridepopup from "./Ridepopup";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState,useEffect } from "react";
import ConfirmRidePopup from "../../components/ConfirmRidePopup";
import Ubermap from "../../components/Ubermap.jsx";
import socket from "../utils/socket.js";
const Captionhome = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [online,setonline]=useState(true)
  const [ridepopupdata,setridepopupdata]=useState({})
  const popupref = useRef(null);
  const confirmPopupRef = useRef(null);
  const captiondetalsref = useRef(null);
  useEffect(()=>{
    socket.on('connect',()=>{
    })
    
    const onPopup = (data) => {
      setridepopupdata(data)
      setShowPopup(true)
    }
    socket.on('popupdata', onPopup)

    return () => {
      socket.off('popupdata', onPopup)
      socket.off('connect')
    }
  },[])
  useGSAP(() => {
    if (showPopup) {
      gsap.to(popupref.current, {
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      gsap.to(popupref.current, {
        y: "100%",
        duration: 0.6,
        ease: "power3.in",
      });
    }
  }, [showPopup]);
  useGSAP(() => {
    if (online) {
      gsap.to(captiondetalsref.current, {
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      gsap.to(captiondetalsref.current, {
        y: "100%",
        duration: 0.6,
        ease: "power3.in",
      });
    }
  }, [online]);
  useGSAP(() => {
    if (showConfirmPopup) {
      gsap.to(confirmPopupRef.current, {
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      gsap.to(confirmPopupRef.current, {
        y: "100%",
        duration: 0.6,
        ease: "power3.in",
      });
    }
  }, [showConfirmPopup]);

  const nav = () => {
    window.location.href = "/logout";
  };

  return (
    <div className="w-full h-screen bg-gray-50 relative">
      <div className="w-full h-[55%] relative">
        <Ubermap />
        <button
          className="absolute top-5 right-5 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition"
          onClick={nav}
        >
          <i className="ri-logout-box-line text-xl"></i>
        </button>
        {/* test/demo button removed; ride popups will open when server sends them */}
      </div>
      <div className="absolute bottom-0 w-full bg-white p-6 rounded-t-3xl shadow-2xl" ref={captiondetalsref}>
        <Captiondetails online={online} setonline={setonline} />
      </div>
      <div
        ref={popupref}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl transform translate-y-full"
      >
        <Ridepopup setShowPopup={setShowPopup} setShowConfirmPopup={setShowConfirmPopup} ridepopupdata={ridepopupdata} />
      </div>

      <div
        ref={confirmPopupRef}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl transform translate-y-full"
      >
        <ConfirmRidePopup setShowConfirmPopup={setShowConfirmPopup} setShowPopup={setShowPopup} ridepopupdata={ridepopupdata}/>
      </div>
    </div>
  );
};

export default Captionhome;