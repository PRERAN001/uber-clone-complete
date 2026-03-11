import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LoacationSearchpannel from "../../components/LoacationSearchpannel";
import Vechiclepannel from "../../components/Vechiclepannel";
import Selectedvechicle from "../../components/Selectedvechicle";
import Lookingfordriver from "../../components/Lookingfordriver";
import Allocateddriver from "../../components/Allocateddriver";
gsap.registerPlugin(useGSAP);
import { alocdriver } from "../context/Allocateddrivercontext.jsx";
import { useContext } from "react";
import Ubermap from "../../components/Ubermap.jsx";
import axios from "axios";
import { Usercontext } from "../context/Usecontext.jsx";
import haversineDistance from "../utils/fnddsusngcordinates.js";
import socket from "../utils/socket.js";
import Waitingfordriver from "../../components/Waitingfordriver.jsx";

const Strart = () => {
  const [pickup, setpickup] = useState("");
  const [drop, setdrop] = useState("");
  const [pannelopen, setpannelopen] = useState(false);
  const [vechicle2, setvechicle2] = useState(false);
  const [ride, setride] = useState(false);
  const [dfound, setdfound] = useState(false);
  const [wdriver, setwdriver] = useState(false);
  const pannelref = useRef(null);
  const downarrow = useRef(null);
  const vechiclepannel = useRef(null);
  const ridepannel = useRef(null);
  const vfoundref = useRef(null);
  const waitingfordriverref = useRef(null);
  const { driverAllocated, setDriverAllocated } = useContext(alocdriver);
  const [set1cordinates, setSet1cordinates] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
  });
  const currentref = useRef(null);
  const currentlocation = "your current location";
  const [set2cordinates, setSet2cordinates] = useState({
    latitude: 12.96,
    longitude: 77.58,
  });
  const { droplocname, setDroplocname, location, setPickupname, setPickupppp, setinvitieacc, invitieacc} =
    useContext(Usercontext);
  const [currentcordinates, setCurrentcordinates] = useState(null);
  const [distance, setDistance] = useState(0);
  const accbydriver=useRef(null)

  useEffect(() => {
    const handleRideAccepted = (data) => {
      console.log("Ride accepted by driver:", data);
      setdfound(true);
      setwdriver(true);
    };

    socket.on("rideacceptedbydriver", handleRideAccepted);

    return () => {
      socket.off("rideacceptedbydriver", handleRideAccepted);
    };
  }, []);

  useEffect(() => {
    let calculatedDistance = 0;

    if (set1cordinates && set2cordinates) {
      calculatedDistance = haversineDistance(set1cordinates, set2cordinates);
      console.log(
        "Distance between pickup and drop:",
        calculatedDistance,
        "km"
      );
    }

    setDistance(calculatedDistance);
  }, [set1cordinates, set2cordinates]);
  useEffect(() => {
    if (location) {
      setCurrentcordinates(location);
      setSet1cordinates({
        latitude: location.latitude,
        longitude: location.longitude,
      });
      
      
      
    }
  }, [location]);

  const senddatapickup = async () => {
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_BASEURL_senddetails}/senddetails`,
        {
          location: pickup,
        }
      );
      console.log(data.data.latlon);
      setSet1cordinates({
        latitude: data.data.latlon.latitude,
        longitude: data.data.latlon.longitude,
      });
      setPickupname(pickup);
      setPickupppp(pickup);
    } catch (err) {
      console.error(
        "Error sending pickup location:",
        err?.response?.data || err.message
      );
    }
  };
  const senddatadrop = async () => {
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_BASEURL_senddetails}/senddetails`,
        {
          location: droplocname,
        }
      );
      console.log(data.data.latlon);
      setSet2cordinates({
        latitude: data.data.latlon.latitude,
        longitude: data.data.latlon.longitude,
      });
    } catch (err) {
      console.error(
        "Error sending drop location:",
        err?.response?.data || err.message
      );
    }
  };

  const submithandler = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (!driverAllocated) {
      const timer = setTimeout(() => {
        setDriverAllocated(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [driverAllocated]);

  useGSAP(() => {
    if (pannelopen) {
      gsap.to(pannelref.current, {
        height: "70%",
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.to(downarrow.current, {
        opacity: 1,
      });
    } else {
      gsap.to(pannelref.current, {
        height: "0%",
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.to(downarrow.current, {
        opacity: 0,
      });
    }
  }, [pannelopen]);
  useGSAP(() => {
    if (vechicle2) {
      gsap.to(vechiclepannel.current, {
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      gsap.to(vechiclepannel.current, {
        y: "100%",
        duration: 0.6,
        ease: "power3.in",
      });
    }
  }, [vechicle2]);
  useGSAP(() => {
    if (ride) {
      gsap.to(ridepannel.current, {
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      gsap.to(ridepannel.current, {
        y: "100%",
        duration: 0.6,
        ease: "power3.in",
      });
    }
  }, [ride]);

  useGSAP(() => {
    if (wdriver) {
      gsap.to(waitingfordriverref.current, {
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      gsap.to(waitingfordriverref.current, {
        y: "100%",
        duration: 0.6,
        ease: "power3.in",
      });
    }
  }, [wdriver]);

  useGSAP(() => {
    if (dfound) {
      gsap.to(vfoundref.current, {
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      gsap.to(vfoundref.current, {
        y: "100%",
        duration: 0.6,
        ease: "power3.in",
      });
    }
  }, [dfound]);
    useGSAP(() => {
    if (invitieacc) {
      gsap.to(accbydriver.current, {
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      gsap.to(accbydriver.current, {
        y: "100%",
        duration: 0.6,
        ease: "power3.in",
      });
    }
  }, [invitieacc]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="absolute w-17 ml-5 mt-10 "
        src="https://www.pngplay.com/wp-content/uploads/8/Uber-Logo-Transparent-Background.png"
        alt=""
      />

      <div className="h-screen w-screen">
        <Ubermap
          set1cordinates={set1cordinates}
          set2cordinates={set2cordinates}
        />
      </div>

      <div className=" absolute flex flex-col justify-end top-0 h-screen w-full ">
        <div className="h-[30%] bg-white p-5 flex flex-col justify-center">
          <h5
            ref={downarrow}
            onClick={() => {
              setpannelopen(false);
            }}
            className="down text-2xl opacity-0 font-semibold "
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>

          <form onSubmit={submithandler}>
            <div className="flex gap-2 mb-5">
              <input
                className="bg-[#eee] px-8 py-2 text-lg w-full rounded-lg"
                onClick={() => setpannelopen(true)}
                value={pickup}
                ref={currentref}
                onChange={(e) => {
                  setpickup(e.target.value);
                  setPickupname(e.target.value);
                }}
                type="text"
                placeholder="Enter your pick up location"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (pickup.trim().length >= 3) {
                    if (pickup === currentlocation) {
                      console.log("Using current location, skipping API call");
                    } else {
                      senddatapickup();
                    }
                  }
                }}
                className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                <i className="ri-search-line"></i>
              </button>
              <button
                onClick={() => {
                  setpickup(currentlocation);
                  if (currentcordinates) {
                    setPickupname(currentlocation);
                    setSet1cordinates({
                      latitude: currentcordinates.latitude,
                      longitude: currentcordinates.longitude,
                    });
                  }
                }}
                className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                current loc
              </button>
            </div>

            <div className="flex gap-2">
              <input
                className="bg-[#eee] px-8 py-2 text-lg w-full rounded-lg"
                onClick={() => setpannelopen(true)}
                value={droplocname}
                onChange={(e) => setDroplocname(e.target.value)}
                type="text"
                placeholder="Enter your drop location"
              />

              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (droplocname.trim().length >= 3) {
                    senddatadrop();
                  }
                }}
                className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                <i className="ri-search-line"></i>
              </button>
            </div>
          </form>
        </div>

        <div
          ref={pannelref}
          className="bg-white h-0 "
          style={{ height: "0%", overflow: "hidden" }}
        >
          <LoacationSearchpannel
            setvechicle={setvechicle2}
            vechicle={vechicle2}
            pannelopen={pannelopen}
            setpannelopen={setpannelopen}
            setSet2cordinates={setSet2cordinates}
            setDropoffname={setdrop}
            setPickupname={setPickupname}
          />
        </div>
      </div>
      <div
        className="fixed z-10 bottom-0 w-full bg-white px-3 py-6 shadow-2xl rounded-t-3xl transform translate-y-full"
        ref={vechiclepannel}
      >
        <Vechiclepannel
          setvechicle2={setvechicle2}
          setride={setride}
          vechicle2={vechicle2}
          distance={distance}
          valuepick={pickup}
          valuedrop={droplocname}

        />
      </div>
      <div
        className="fixed z-10 bottom-0 w-full bg-white px-3 py-3 shadow-2xl rounded-t-3xl transform translate-y-full"
        ref={ridepannel}
      >
        <Selectedvechicle
          setride={setride}
          setvechicle2={setvechicle2}
          ride={ride}
          setdfound={setdfound}
          setwdriver={setwdriver}
          valuepick={pickup}
          valuedrop={droplocname}

        />
      </div>
      <div
        className="fixed z-10 bottom-0 w-full bg-white px-3 py-3 shadow-2xl rounded-t-3xl transform translate-y-full"
        ref={waitingfordriverref}
      >
        <Lookingfordriver
          setdfound={setdfound}
          vfound={dfound}
          setride={setride}
          valuepick={pickup}
          valuedrop={droplocname}
          setwdriver={setwdriver}
        />
      </div>
      <div
        className="fixed z-10 bottom-0 w-full bg-white px-3 py-3 shadow-2xl rounded-t-3xl transform translate-y-full"
        ref={accbydriver}
      >
        <Waitingfordriver />
        
      </div>
      <div
        className="fixed z-10 bottom-0 w-full bg-white px-3 py-3 shadow-2xl rounded-t-3xl transform translate-y-full"
        ref={vfoundref}
      >
        <Allocateddriver
          setdfound={setdfound}
          vfound={dfound}
          setride={setride}
          setwdriver={setwdriver}
          wdriver={wdriver}
          valuepick={pickup}
          valuedrop={droplocname}
        />
      </div>
    </div>
  );
};

export default Strart;




