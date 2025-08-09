import React, { useState } from 'react'
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import fleet from "../assets/img/fleet1.png"
import axios from 'axios'
const CaptainLogin = () => {
    const navigate = useNavigate();
    const [Email,setEmail]= useState('');
    const [Password,setPassword]= useState('');
    const [CaptainData,setCaptainData]=useState({});
  
    const submitCaptainData =async (e)=>{
      e.preventDefault();
      setCaptainData({ 
        email:Email,
        password:Password
      })
      const captainData={
        email:Email,
        password:Password
      } 
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captainData);
      if(response.status===200){
        console.log({success:true,message:"Captain logged in successfully"});
        localStorage.setItem("token",response.data.token);
        navigate("/captain-home");
      }
      setEmail(' ');
      setPassword(' ');
    }
  return (
    <div className="h-screen flex flex-col ">
      
     <div className='w-full mt-2 ml-2'><img className="h-10 ml-2 " src={fleet} alt="Fleet Logo" /></div>
      <div className='my-8 h-screen mx-8 flex flex-col justify-between '>
      <form className=" flex flex-col justify-between" onSubmit={(e)=>{
        submitCaptainData(e);
      }}>
         <h2 className='text-3xl font-bold '>What's your email</h2>
         <input className="w-full bg-gray-300 placeholder:text-2xl px-2 py-5 my-4" type="email" required placeholder='email123@gmail.com' 
         value={Email} 
         onChange={(e)=>{
          setEmail(e.target.value)
         }} />
         <h2  className='text-3xl font-bold' >Enter Password</h2>
         <input value={Password} onChange={(e)=>{
          setPassword(e.target.value)
         }} className="w-full bg-gray-300 placeholder:text-2xl px-2 py-5 my-4" type="password" required placeholder='password' />
         <button className="flex justify-center items-center w-full mb-1 bg-[#00B894] text-white  text-2xl font-bold py-5 my-5 rounded-2xl">Login</button>
         <p className=" mt-2 text-center text-2xl font-bold">Become a captainn? <Link to="/captain-signup" className="text-blue-700 underline"> Create new Account</Link></p>
      </form>
      <Link to="/login" className='flex justify-center items-center bg-[#2988d1] text-white py-5 text-2xl font-bold rounded-xl'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin