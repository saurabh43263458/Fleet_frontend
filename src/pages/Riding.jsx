import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SocketContext } from '../ContextApi/SocketContext';
import LiveTracking from '../Components/LiveTracking';
import axios from 'axios';

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    socket.on("ride-ended", () => {
      navigate('/start-home');
    });
  }, [socket, navigate]);

  const handlePayment = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/create-order`, {
        amount: Math.round(ride.fare),
        userId: ride.userId,
        rideId: ride._id
      });

      const { orderId, amount } = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "Ride Payment",
        description: "Fare for completed ride",
        order_id: orderId,
        handler: async function (response) {
          await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId: ride.user._id,
            rideId: ride._id,
            amount: Math.round(ride.fare)
          });

          setPaymentSuccess(true);
        },
        prefill: {
          name: ride?.userName || "Customer",
          email: "sm427878@gmail.com",
          contact: "7985165277"
        },
        theme: {
          color: "#00B894"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Floating Home Button */}
      <Link to="/home" className="fixed right-3 top-3 h-10 w-10 bg-white shadow-md flex items-center justify-center rounded-full hover:scale-110 transition">
        <i className="text-xl ri-home-5-line text-gray-700"></i>
      </Link>

      {/* Map Section */}
      <div className="h-1/2 border-b">
        <LiveTracking />
      </div>

      {/* Ride Info Section */}
      <div className="h-1/2 p-5 bg-white shadow-inner flex flex-col justify-between">
        {/* Captain Info */}
        {/* Captain Info */}
<div className="flex items-center gap-5  pb-4">
  <img
    className="h-20 rounded-full object-cover"
    src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
    alt="Driver"
  />
  <div className="flex-1">
    <h2 className="text-lg font-semibold capitalize">{ride?.captain.fullname.firstname}</h2>
    <p className="text-gray-500">{ride?.captain.vehicle.plate}</p>
    <span className="text-sm text-gray-400">Toyota</span> {/* You can replace "Toyota" dynamically if you have model info */}
  </div>
  <div className="flex gap-3">
    {/* Chat Button */}
    <button
      onClick={() => {
        // Add chat logic here or navigation
        alert("Chat feature coming soon!");
      }}
      className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-md transition"
      aria-label="Chat with driver"
    >
      <i className="ri-chat-3-line text-xl"></i>
    </button>

    {/* Call Button */}
    <button
      onClick={() => {
        // Use tel: link to call the driver if number available
        if (ride?.captain.phone) {
          window.location.href = `tel:${ride.captain.phone}`;
        } else {
          alert("Driver phone number not available");
        }
      }}
      className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-md transition"
      aria-label="Call driver"
    >
      <i className="ri-phone-line text-xl"></i>
    </button>
  </div>
</div>


        {/* Destination & Fare */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg shadow-sm">
            <i className="text-lg ri-map-pin-2-fill text-green-600"></i>
            <div>
              <h3 className="text-lg font-medium">Drop-off</h3>
              <p className="text-sm text-gray-500">{ride?.destination}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg shadow-sm">
            <i className="ri-currency-line text-yellow-500"></i>
            <div>
              <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
              <p className="text-sm text-gray-500">Cash Payment</p>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        {!paymentSuccess ? (
          <button
            className="mt-5 w-full bg-[#00B894] hover:bg-[#019A78] text-white font-semibold py-3 rounded-lg shadow-md transition-transform transform hover:scale-[1.02]"
            onClick={handlePayment}
          >
            Make a Payment
          </button>
        ) : (
          <div className="mt-5 text-center">
            <h2 className="text-green-600 font-bold text-lg mb-3">Payment Successful</h2>
            <button
              onClick={() => navigate('/start-home')}
              className="bg-blue-600 mt-5 w-full text-white font-semibold py-3 rounded-lg shadow-md transition-transform transform hover:scale-[1.02]"
            >
              Go to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Riding;
