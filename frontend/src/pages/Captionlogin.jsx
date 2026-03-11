import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { captioncontext } from "../context/Captioncontext.jsx";
import socket from "../utils/socket";

const Captionlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setcaption } = useContext(captioncontext);
  const navigate = useNavigate();

  async function submithandler(e) {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL_client}/api/caption/captionlogin`,
        data
      );
      
      if (response.status === 200) {
        setcaption(response.data);
        localStorage.setItem("token", response.data.token);
        
        
        const driverId = response.data.driverid || response.data._id;
        if (driverId) {
          localStorage.setItem("driverid", driverId);
          socket.emit('driverconnect', driverId);
        }
        
        navigate("/captionhome");
      }
    } catch {
      // no-op
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
