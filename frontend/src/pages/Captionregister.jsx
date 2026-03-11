import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {captioncontext} from "../context/Captioncontext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Captionregister = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setcolor] = useState("");
  const [plate, setplate] = useState("");
  const [capacity, setcapacity] = useState("");
  const [vehicletype, setvehicletype] = useState("");
  const navigate = useNavigate();  
  const { caption, setcaption } = useContext(captioncontext);

  async function submithandler(e) {
    e.preventDefault();

    
    if (!firstname.trim() || !lastname.trim() || !email.trim() || !password.trim()) {
      alert('Please fill in all required fields (name, email, password)');
      return;
    }
    if (!color.trim() || !plate.trim() || !capacity || !vehicletype.trim()) {
      alert('Please fill in all vehicle details');
      return;
    }

    const data = {
      firstname,
      lastname,
      email,
      password,
      vechicle:{
        color,
        plate,
        capacity,
        vechicletype: vehicletype,
      }
    };

    try {
      console.log('Submitting caption registration:', data);
      const response = await axios.post(`${import.meta.env.VITE_BASEURL_client}/captionregister`, data);
      if (response.status === 201 || response.status === 200) {
        setcaption(response.data.caption || response.data); 
        localStorage.setItem('token', response.data.token);
        navigate("/captionhome");
      }
    } catch (err) {
      console.error('Caption registration error:', err?.response?.data || err.message);
      alert(`Registration failed: ${err?.response?.data?.error || err.message}`);
      return;
    }

    
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setcolor("");
    setplate("");
    setcapacity("");
    setvehicletype("");
  }

  return (
  <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white w-[90%] max-w-md p-8 rounded-2xl shadow-xl overflow-y-auto max-h-[95vh]">

      <div className="flex flex-col items-center mb-6">
        <img
          className="w-24"
          src="https://static.vecteezy.com/system/resources/previews/027/127/594/original/uber-logo-uber-icon-transparent-free-png.png"
          alt="logo"
        />
      </div>

      <form onSubmit={submithandler} className="space-y-4">

        <h3 className="text-2xl font-semibold">Register as Caption</h3>

        <div>
          <label className="block mb-1">First Name</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Enter first name"
          />
        </div>

        <div>
          <label className="block mb-1">Last Name</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Enter last name"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create password"
          />
        </div>

        <h3 className="text-xl font-semibold mt-6">Vehicle Details</h3>

        <div>
          <label className="block mb-1">Color</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg"
            type="text"
            value={color}
            onChange={(e) => setcolor(e.target.value)}
            placeholder="Vehicle color"
          />
        </div>

        <div>
          <label className="block mb-1">Plate Number</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg"
            type="text"
            value={plate}
            onChange={(e) => setplate(e.target.value)}
            placeholder="Plate number"
          />
        </div>

        <div>
          <label className="block mb-1">Capacity</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg"
            type="text"
            value={capacity}
            onChange={(e) => setcapacity(e.target.value)}
            placeholder="Capacity (e.g., 4)"
          />
        </div>

        <div>
          <label className="block mb-1">Vehicle Type</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg"
            type="text"
            value={vehicletype}
            onChange={(e) => setvehicletype(e.target.value)}
            placeholder="Sedan, SUV, Bike..."
          />
        </div>

        <button
          className="w-full bg-black text-white rounded-lg p-3 text-lg mt-4"
          type="submit"
        >
          Register
        </button>

        <div className="text-center mt-4">
          <p>
            Already have an account?{" "}
            <Link className="text-blue-600" to="/captionlogin">
              Caption Login
            </Link>
          </p>
          <p className="mt-1">
            Register as user{" "}
            <Link className="text-blue-600" to="/userregister">
              User Register
            </Link>
          </p>
        </div>

      </form>

    </div>
  </div>
);

};

export default Captionregister;
