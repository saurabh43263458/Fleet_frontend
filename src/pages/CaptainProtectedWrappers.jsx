import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainContext } from '../ContextApi/CaptainContext';

const CaptainProtectedWrappers = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/captain-login');
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      
      if (response.status === 200) {
       setCaptain(response.data.captain);
console.log(response.data.captain)
        setIsLoading(false);
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate('/captain-login');
      } else {
        console.error("Error fetching captain profile:", error);
      }
    });
  }, []); // Run only once on mount

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <img className='w-25' src="https://cdn.dribbble.com/users/1162073/screenshots/3848912/media/4c8b0d5a1f7c9f8e7d4f3e6f4d7a0b0f.gif" alt="Loading..." />
      </div>
    );
  }

  return <>{children}</>;
};

export default CaptainProtectedWrappers;
