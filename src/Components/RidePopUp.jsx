import React from 'react';

const RidePopUp = (props) => {
  const primaryColor = "#00B894"; // Theme color

  return (
    <div className="bg-white  overflow-hidden">
      {/* Top close icon */}
      <h5
        className="p-1 text-center w-full absolute top-0 left-0"
        onClick={() => props.setRidePopupPanel(false)}
      >
        <i className="text-3xl text-gray-400 hover:text-gray-600 ri-arrow-down-wide-line cursor-pointer"></i>
      </h5>

      {/* Passenger info section */}
      <div className="flex items-center justify-between p-4 bg-red-500 text-white rounded-t-xl">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover border-2 border-white"
            src="https://c.pxhere.com/photos/44/dc/smiling_boy_man_professional_happy_people_young_portrait-865531.jpg!d"
            alt="Passenger"
          />
          <h2 className="text-lg font-semibold">
            {props.ride?.user.fullname.firstname} {props.ride?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-bold bg-white text-red-500 px-3 py-1 rounded-full shadow">
          2.2 KM
        </h5>
      </div>

      {/* Ride details */}
      <div className="w-full mt-4">
        {/* Pickup */}
        <div className="flex items-center gap-5 p-3 ">
          <i className="text-2xl text-green-500 ri-map-pin-fill"></i>
          <p className="text-gray-700">{props.ride?.pickup}</p>
        </div>
        
        {/* Destination */}
        <div className="flex items-center gap-5 p-3 ">
          <i className="text-2xl text-red-500 ri-map-pin-2-fill"></i>
          <p className="text-gray-700">{props.ride?.destination}</p>
        </div>

        {/* Fare */}
        <div className="flex items-center gap-5 p-3">
          <i className="text-2xl" style={{ color: primaryColor }}></i>
          <div>
            <h3 className="text-lg font-medium" style={{ color: primaryColor }}>
              ₹{Math.round(props.ride?.fare)}
            </h3>
            <p className="text-sm -mt-1 text-gray-500">Cash</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-5 w-full px-4 pb-4">
        <button
          onClick={() => {
            props.confirmRide();
            props.setRidePopupPanel(false);
          }}
          className="bg-[#00B894] hover:bg-green-700 w-full text-white font-semibold py-2 rounded-lg shadow"
        >
          Accept Ride
        </button>

        <button
          onClick={() => props.setRidePopupPanel(false)}
          className="mt-2 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg"
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
