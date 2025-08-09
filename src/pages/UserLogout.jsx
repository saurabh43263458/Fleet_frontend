import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Placeholder user data. In a real app, this would come from a prop or context.


const UserLogout = (props) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    
    axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    })
    .catch((error) => {
      console.error("Logout failed:", error);
      // Even on failure, clear the token and redirect to ensure logout
      localStorage.removeItem('token');
      navigate('/login');
    });
  };

  return (
    <div className="relative">
      {/* Profile Header (clickable) */}
      <div 
        onClick={() => setIsMenuOpen(!isMenuOpen)} 
        className="flex items-center cursor-pointer p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200"
      >
        <img 
          src={DUMMY_USER_DATA.avatar} 
          alt="User Avatar" 
          className="w-8 h-8 rounded-full mr-2" 
        />
        <span className="font-semibold text-sm text-gray-800 hidden md:block">
          {DUMMY_USER_DATA.name}
        </span>
        <svg 
          className={`w-4 h-4 ml-2 text-gray-500 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-lg shadow-xl z-50">
          <div className="p-4 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-800">{props.user.fullname.firstname}</p>
            <p className="text-xs text-gray-500 mt-1 truncate">{props.user.email}</p>
          </div>
          <div className="p-2">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 font-medium rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLogout;
