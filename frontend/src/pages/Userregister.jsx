import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useContext} from 'react'
import {Usercontext} from '../context/Usecontext'

const Userregister = () => {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {user,setuser}=useContext(Usercontext)

    async function submithandler(e) {
        e.preventDefault();
        const newuser = { firstname, lastname, email, password };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASEURL}/userregister`, newuser);
            if (response.status === 201) {
                setuser(response.data.user || response.data);
                localStorage.setItem("token", response.data.token);
                navigate('/start');
            }
        } catch (err) {
            return;
        }

        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4 overflow-y-auto">
            <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">

                <div className="flex flex-col items-center mb-6">
                    <img
                        className="w-24"
                        src="https://static.vecteezy.com/system/resources/previews/027/127/594/original/uber-logo-uber-icon-transparent-free-png.png"
                        alt=""
                    />
                </div>

                <form onSubmit={(e) => submithandler(e)} className="space-y-4">
                    <h3 className="text-2xl font-semibold">Create your account</h3>

                    <div>
                        <label className="block mb-1">First name</label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            type="text"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            placeholder="Enter your first name"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Last name</label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            placeholder="Enter your last name"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Password</label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                        />
                    </div>

                    <button
                        className="w-full bg-black text-white rounded-lg p-3 text-lg"
                        type="submit"
                    >
                        Register
                    </button>

                    <div className="text-center">
                        <p className="mt-4">Don't have an account? <Link className="text-blue-600" to="/captionregister">Caption register</Link></p>
                        <p className="mt-1">Sign in as user <Link className="text-blue-600" to="/userlogin">User login</Link></p>
                    </div>
                </form>

                <p className="text-xs text-gray-600 mt-6 text-center px-4">
                    By proceeding, you consent to receive calls, WhatsApp messages, or SMS messages including OTPs to verify your mobile number.
                </p>
            </div>
        </div>
    );
};

export default Userregister;
