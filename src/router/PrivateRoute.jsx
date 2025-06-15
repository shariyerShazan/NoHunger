import React, { useContext, useEffect } from 'react';
import { MyContext } from '../context/Context';
import { useNavigate, useLocation } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(MyContext);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
      setTimeout(() => {
        navigate("/login", {
          state: { from: location.pathname }, 
        });
      }, 1500);
    }
  }, [user, navigate, location]);

  if (!user) return <ToastContainer />;

  return <>{children}</>;
};

export default PrivateRoute;
