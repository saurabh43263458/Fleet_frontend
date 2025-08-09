import React from 'react';

const Vehicletype = ({
  setImage,
  setvehicletype,
  setpanel,
  setChooseVehicle,
  fare,
  setConfirmedVehicle,
  setfare
}) => {
  const vehicleLink = {
    bike: {
      image:
        'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
      name: 'Bike',
      price: parseInt(fare.Bike),
      capacity: '1',
      time: '3 mins',
      message: 'Best for short trips'
    },
    car: {
      image:
        'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png',
      name: 'Car',
      price: parseInt(fare.Car),
      capacity: '4',
      time: '5 mins',
      message: 'Comfortable ride for small groups'
    },
    Auto: {
      image:
        'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
      name: 'Auto',
      price: parseInt(fare.Auto),
      capacity: '3',
      time: '4 mins',
      message: 'Affordable and convenient'
    },
    Van: {
      image:
        'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1682350114/assets/c2/296eac-574a-4a81-a787-8a0387970755/original/UberBlackXL.png',
      name: 'Van',
      price: parseInt(fare.Van),
      capacity: '6',
      time: '6 mins',
      message: 'Spacious and comfortable'
    }
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex justify-between items-center rounded-t-3xl mb-5 border-b pb-3">
        <p className="font-bold text-2xl text-gray-900">Choose Vehicle</p>
        <button
          className="text-gray-500 hover:text-gray-800 transition"
          onClick={() => {
            setvehicletype(false);
            setpanel(true);
          }}
        >
          <i className="ri-arrow-down-s-line text-2xl"></i>
        </button>
      </div>

      {/* Vehicle List */}
      <div className="space-y-4">
        {Object.keys(vehicleLink).map((key, index) => {
          const vehicle = vehicleLink[key];
          return (
            <div
              key={index}
              onClick={() => {
                setChooseVehicle(vehicle);
                setvehicletype(false);
                setConfirmedVehicle(true);
                setfare(vehicle.price);
              }}
              className="flex items-center p-4 bg-white rounded-2xl cursor-pointer border border-gray-100 shadow-sm hover:shadow-md hover:border-[#00B894] transition-all duration-200"
            >
              {/* Vehicle Image */}
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="h-14 w-14 object-contain"
              />

              {/* Vehicle Details */}
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg text-gray-900">
                    {vehicle.name}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {vehicle.capacity} seats
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm font-medium text-gray-600">
                    {vehicle.time}
                  </span>
                  <span className="font-bold text-gray-900">
                    ₹ {vehicle.price}
                  </span>
                </div>
                <p className="text-xs text-[#00B894] mt-1 font-medium">
                  {vehicle.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Vehicletype;
