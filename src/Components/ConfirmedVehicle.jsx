import React from 'react';

const ConfirmedVehicle = ({ Image, createRide, pickup, drop, choosevehicle, setConfirmedVehicle, setvehiclefound }) => {
  return (
    <div 
      className="flex flex-col items-center justify-center bottom-0 bg-white shadow-lg rounded-t-3xl p-5 w-full max-w-md mx-auto"
      onClick={() => setConfirmedVehicle(false)}
    >
      {/* Drag handle */}
      <h2 className="flex justify-center items-center cursor-pointer mb-3">
        <i className="ri-arrow-down-s-line text-3xl text-gray-400"></i>
      </h2>

      {/* Title */}
      <div className="text-2xl font-bold mb-4 text-center">
        Confirm Your Vehicle
      </div>

      {/* Vehicle Image */}
      <div className="w-full flex justify-center items-center mb-4">
        <img 
          className="h-32 w-32 object-contain drop-shadow-md" 
          src={choosevehicle.image} 
          alt="Vehicle" 
        />
      </div>

      {/* Pickup Location */}
      <div className="flex items-center gap-3 py-2 border-b border-gray-300 w-full">
        <i className="ri-map-pin-2-fill text-xl text-green-600"></i>
        <h3 className="text-gray-700 text-lg font-medium">{pickup}</h3>
      </div>

      {/* Drop Location */}
      <div className="flex items-center gap-3 py-2 border-b border-gray-300 w-full">
        <i className="ri-map-pin-2-fill text-xl text-red-500"></i>
        <h3 className="text-gray-700 text-lg font-medium">{drop}</h3>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between w-full py-4">
        <h2 className="text-xl font-semibold">Price</h2>
        <h3 className="text-xl font-bold text-[#00B894]">
          {choosevehicle?.price != null ? `${choosevehicle.price}` : "Price not available"}
        </h3>
      </div>

      {/* Confirm Button */}
      <button
        onClick={() => {
          setConfirmedVehicle(false);
          setvehiclefound(true);
          createRide();
        }}
        className="w-full bg-[#00B894]  text-white text-xl font-bold py-4 rounded-xl shadow-md"
      >
        Confirm
      </button>
    </div>
  );
};

export default ConfirmedVehicle;
