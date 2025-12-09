import React, { useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Usercontext } from "../context/Usecontext";

const userlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userdata, setuserdata] = useState({});
  const navigate = useNavigate();
  const { user, setuser } = useContext(Usercontext);

  useEffect(() => {
    console.log(userdata);
  }, [userdata]);

  async function submithandler(e) {
    e.preventDefault();

    const response = await axios.post(`${import.meta.env.VITE_BASEURL}/userlogin`, {
      email: email,
      password: password,
    });

    setuser(response.data);
    localStorage.setItem("token", response.data.token);
    setuserdata(response.data);
    navigate("/start");

    setEmail("");
    setPassword("");
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">

        <div className="flex flex-col items-center mb-6">
          <img
            className="w-24"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-Logo-Transparent-Background.png"
            alt=""
          />
        </div>

        <form className="space-y-4" onSubmit={(e) => submithandler(e)}>
          <h3 className="text-2xl font-semibold">Login to your account</h3>

          <div>
            <label className="block mb-1">Email</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
              placeholder="password"
            />
          </div>

          <button className="w-full bg-black text-white rounded-lg p-3 text-lg" type="submit">
            Login
          </button>

          <div className="text-center">
            <p className="mt-4">Don't have an account? <Link className="text-blue-600" to="/userregister">Register</Link></p>
            <p className="mt-1">Sign in as caption <Link className="text-blue-600" to="/captionlogin">Caption login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default userlogin;