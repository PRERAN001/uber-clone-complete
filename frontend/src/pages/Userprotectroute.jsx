import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Userprotectroute = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();


    useEffect(() => {
      if (!token) {
        navigate('/userlogin');
      }
    }, [token]);
  

  return children;
};

export default Userprotectroute;
