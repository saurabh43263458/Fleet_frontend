import React from 'react'
import {Link} from "react-router-dom"
import fleet from "../assets/img/fleet1.png"
const Home = () => {
  return (
    <div>
        <div className=" h-screen w-full bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1566243052021-d39ace07c392?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] relative">
          
            <div className=" absolute t-10"><img className="h-10 ml-5 mt-5" src={fleet} alt="Fleet Logo" /></div>
          

            <div className=' w-full absolute bottom-0 bg-white flex item-center justify-around'> 
              <div className='w-[80%] '>
              <h2 className='text-2xl font-bold my-6'>Welcome to JetCab </h2>
              <Link to="/login" className='flex justify-center items-center w-full mb-5 bg-[#00B894] text-white rounded-2xl text-2xl font-bold py-4'>Continue</Link>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Home