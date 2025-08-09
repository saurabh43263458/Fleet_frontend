import React from 'react';
import { useNavigate } from 'react-router-dom';



const CaptainDetails = (prorps) => {
   
    const navigate = useNavigate();

   
    const handleLogout = () => {
        // Redirect to the logout route, where the logout logic will be handled
        navigate('/captain-logout');
    };

    return (
        <div className="p-4  bg-white ">
            {/* Top Section */}
            <div className="flex  items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    {/* Captain Profile Image */}
                    <img
                        className="h-16 w-16 rounded-full object-cover border-2 border-green-500 shadow-md"
                        src="https://manblog.co.uk/wp-content/uploads/2015/06/Handsome-male-driver.jpg"
                        alt="Captain"
                    />
                    {/* Captain Name and Status */}
                    <div>
                        <h4 className="text-xl font-bold capitalize text-green-700">
                            {prorps.captain?.fullname.firstname || "Captain Unknown"}
                        </h4>
                        <p className="text-sm text-gray-500">Online</p>
                    </div>
                </div>
                {/* Earnings */}
                <div className="text-center sm:text-right mt-4 sm:mt-0">
                    <h4 className="text-2xl font-bold text-green-600">₹295.20</h4>
                    <p className="text-sm text-gray-500">Earned Today</p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-6 p-4 bg-green-50 rounded-2xl">
                {/* Hours Online */}
                <div className="text-center">
                    <i className="ri-timer-2-line text-3xl mb-1 text-green-500"></i>
                    <h5 className="text-xl font-bold">10.2</h5>
                    <p className="text-sm text-gray-600">Hours Online</p>
                </div>
                {/* Total Rides */}
                <div className="text-center">
                    <i className="ri-speed-up-line text-3xl mb-1 text-green-500"></i>
                    <h5 className="text-xl font-bold">145</h5>
                    <p className="text-sm text-gray-600">Total Rides</p>
                </div>
                {/* Distance Covered */}
                <div className="text-center">
                    <i className="ri-road-map-line text-3xl mb-1 text-green-500"></i>
                    <h5 className="text-xl font-bold">320 km</h5>
                    <p className="text-sm text-gray-600">Distance Covered</p>
                </div>
            </div>

            {/* Ratings Section */}
            <div className="mt-6 p-4 bg-green-50 rounded-2xl flex items-center justify-between">
                <div>
                    <h4 className="text-lg font-semibold text-green-700 mb-2">Ratings</h4>
                    <div className="flex items-center gap-2">
                        {/* Star Ratings */}
                        <div className="flex text-yellow-500 text-lg">
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-fill"></i>
                            <i className="ri-star-half-fill"></i>
                        </div>
                        <span className="text-gray-600 text-sm">4.5 / 5 (320 reviews)</span>
                    </div>
                </div>
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-600 transition-colors duration-200"
                >
                    <i className="ri-logout-box-r-line text-lg"></i>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default CaptainDetails;
