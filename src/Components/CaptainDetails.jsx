import React, { useContext } from 'react';
import { CaptainContext } from '../ContextApi/CaptainContext';

const CaptainDetails = () => {
    const { captain } = useContext(CaptainContext);

    return (
        <div className="p-5 ">
            {/* Top Section */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        className="h-12 w-12 rounded-full object-cover border-2 border-green-500"
                        src="https://manblog.co.uk/wp-content/uploads/2015/06/Handsome-male-driver.jpg"
                        alt="Captain"
                    />
                    <div>
                        <h4 className="text-lg font-semibold capitalize text-green-700">
                            {captain.name}
                        </h4>
                        <p className="text-sm text-gray-500">UNknown</p>
                    </div>
                </div>
                <div className="text-right">
                    <h4 className="text-xl font-bold text-green-600">₹295.20</h4>
                    <p className="text-sm text-gray-500">Earned Today</p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="flex p-4 mt-6 bg-green-50 rounded-xl justify-center gap-6">
                <div className="text-center">
                    <i className="text-3xl mb-1 text-green-500 ri-timer-2-line"></i>
                    <h5 className="text-lg font-semibold">10.2</h5>
                    <p className="text-sm text-gray-600">Hours Online</p>
                </div>
                <div className="text-center">
                    <i className="text-3xl mb-1 text-green-500 ri-speed-up-line"></i>
                    <h5 className="text-lg font-semibold">145</h5>
                    <p className="text-sm text-gray-600">Total Rides</p>
                </div>
                <div className="text-center">
                    <i className="text-3xl mb-1 text-green-500 ri-road-map-line"></i>
                    <h5 className="text-lg font-semibold">320 km</h5>
                    <p className="text-sm text-gray-600">Distance Covered</p>
                </div>
            </div>

            {/* Ratings Section */}
            <div className="mt-6 p-4 bg-green-50 rounded-xl">
                <h4 className="text-lg font-semibold text-green-700 mb-2">Ratings</h4>
                <div className="flex items-center gap-2">
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

            {/* Additional Details */}
           
        </div>
    );
};

export default CaptainDetails;
