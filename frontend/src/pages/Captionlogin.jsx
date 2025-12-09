import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { captioncontext } from "../context/Captioncontext.jsx";
import socket from "../utils/socket";

const Captionlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captiondata, setcaptiondata] = useState({});
  const { caption, setcaption } = useContext(captioncontext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(captiondata);
  }, [captiondata]);

  async function submithandler(e) {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL_client}/captionlogin`,
        data
      );

      console.log("Full login response:", response.data);
      
      if (response.status === 200) {
        setcaptiondata(data);
        setcaption(response.data);
        localStorage.setItem("token", response.data.token);
        
        // Store driverid and verify it was stored
        const driverId = response.data.driverid || response.data._id;
        if (driverId) {
          localStorage.setItem("driverid", driverId);
          console.log("Driver login successful, driverid stored:", driverId);
          console.log("Emitting driverconnect with driverid:", driverId);
          socket.emit('driverconnect', driverId);
        } else {
          console.error("ERROR: driverId is null/undefined in response!");
        }
        
        navigate("/captionhome");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }

    setEmail("");
    setPassword("");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <div className="flex justify-center mb-6">
          <img
            className="w-24"
            src="https://static.vecteezy.com/system/resources/previews/027/127/594/original/uber-logo-uber-icon-transparent-free-png.png"
            alt="Uber Logo"
          />
        </div>

        <h2 className="text-3xl font-semibold text-center mb-6">
          Caption Login
        </h2>

        <form onSubmit={submithandler} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="yourmail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="•••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg text-lg font-medium hover:bg-gray-900 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Don’t have an account?{" "}
            <Link to="/captionregister" className="text-blue-600 font-medium">
              Register
            </Link>
          </p>

          <p className="text-gray-700 mt-2">
            Sign in as user?{" "}
            <Link to="/userlogin" className="text-blue-600 font-medium">
              User Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Captionlogin;
