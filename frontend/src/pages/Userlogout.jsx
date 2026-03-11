import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Userlogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.get(
          `${import.meta.env.VITE_BASEURL}/logout`,
          {
            headers: {
              authorization: "Bearer " + token
            }
          }
        );

        localStorage.removeItem("token");
        navigate("/userlogin");
      } catch {
        // no-op
      }
    };

    logout();
  }, []);

  return <div>Logging out...</div>;
};

export default Userlogout;
