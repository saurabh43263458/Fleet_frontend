import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
    const navigate = useNavigate()

    async function endRide() {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/ride/end-ride`,
            { rideId: props.ride._id },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )

        if (response.status === 200) {
            navigate('/captain-home')
        }
    }

    return (
        <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        className="h-12 w-12 rounded-full object-cover"
                        src="https://c.pxhere.com/photos/44/dc/smiling_boy_man_professional_happy_people_young_portrait-865531.jpg!d"
                        alt="user"
                    />
                    <div>
                        <h2 className="text-lg font-semibold capitalize">
                            {props.ride?.user.fullname.firstname}
                        </h2>
                        <p className="text-sm text-gray-500">⭐ 4.9</p>
                    </div>
                </div>
                <h5 className="text-lg font-semibold">{props.ride?.distance || '2.2'} KM</h5>
            </div>

            {/* Ride Details */}
            <div className="mt-5 space-y-3">
                {/* Pickup */}
                <div className="flex items-start gap-3">
                    <i className="ri-map-pin-user-fill text-green-600 text-xl"></i>
                    <div>
                        <p className="text-sm text-gray-500">Pickup</p>
                        <h3 className="text-lg font-medium">{props.ride?.pickup}</h3>
                    </div>
                </div>

                {/* Destination */}
                <div className="flex items-start gap-3">
                    <i className="ri-map-pin-2-fill text-red-500 text-xl"></i>
                    <div>
                        <p className="text-sm text-gray-500">Destination</p>
                        <h3 className="text-lg font-medium">{props.ride?.destination}</h3>
                    </div>
                </div>

                {/* Fare */}
                <div className="flex items-start gap-3">
                    <i className="ri-currency-line text-yellow-500 text-xl"></i>
                    <div>
                        <p className="text-sm text-gray-500">Fare</p>
                        <h3 className="text-lg font-medium">₹{props.ride?.fare} Cash</h3>
                    </div>
                </div>
            </div>

            {/* Button */}
            <button
                onClick={endRide}
                className="w-full mt-6 bg-[#00B894] text-white font-semibold p-3 rounded-lg text-lg"
            >
                Finish Ride
            </button>
        </div>
    )
}

export default FinishRide
