import React from 'react';

const LookingForDriver = ({ pickup, destination, fare, setVehicleFound, choosevehicle }) => {
  const displayPickup = pickup || "Pickup location not set";
  const displayDestination = destination || "Destination not set";
  const displayFare = fare != null ? `₹${fare}` : "Fare not available";
  const vehicleImage = choosevehicle?.image || "/img1/car.png";

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => setVehicleFound(false)}
      >
        <i className="text-3xl text-[#00B894] ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold text-center">Looking for a Driver</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-20"
          src={vehicleImage}
          alt="vehicle"
        />

        <div className="w-full mt-5">
          {/* Pickup */}
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-2xl text-[#00B894] ri-map-pin-fill"></i>
            <p className="text-sm text-gray-700">{displayPickup}</p>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-5 p-3 ">
            <i className="ri-map-pin-fill text-red-500 text-lg mb-1"></i>
            <p className="text-sm text-gray-700">{displayDestination}</p>
          </div>

          {/* Fare */}
          <div className="flex items-center gap-5 p-3">
            <i className="text-2xl text-[#00B894] ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">{displayFare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;

