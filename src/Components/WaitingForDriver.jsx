import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div className='rounded-t-3xl'>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.waitingForDriver(false)
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

      <div className="flex items-center justify-between gap-4">
  <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
  <div className="text-right flex-1">
    <h2 className="text-xl font-semibold capitalize text-gray-900">
      {props.ride?.captain.fullname.firstname} {props.ride?.captain.fullname.lastname}
    </h2>
    <h4 className="text-lg font-medium text-gray-700">{props.ride?.captain.vehicle.plate}</h4>
    <p className="text-sm text-gray-500 mb-2">{props.ride?.captain.vehicle.model || 'Not Known'}</p>
    <div className="inline-block bg-[#00B894] text-white px-3 py-1 rounded-md font-semibold tracking-wide">
      OTP: {props.ride?.otp}
    </div>
  </div>
</div>



      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 '>
              <div className="w-3 h-3 border-2 border-green-500 rounded-full mt-2"></div>
            <div>
             
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 '>
            <i className="ri-map-pin-fill text-red-500 text-lg mb-1"></i>
            <div>
              
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>₹ {Math.round(props.ride?.fare)} </h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver