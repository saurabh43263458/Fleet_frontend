import React, { useState ,useContext,useEffect} from 'react'
import {UserContext} from '../ContextApi/userContextapi';
import {Link,useNavigate} from 'react-router-dom'
import fleet from "../assets/img/fleet1.png"
import axios from 'axios';
const UserLogin = () => {

const {user,setUser} = useContext(UserContext);
const navigate = useNavigate();
  const [Email,setEmail]= useState('');
  const [Password,setPassword]= useState('');
  const [UserData,setUserData]=useState({});

  const submitUserData =async (e)=>{
    e.preventDefault();
    const userData={
      email:Email,
      password:Password
    }
    setUserData(userData);
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,userData);
    if(response.status===200){
      console.log({success:true,message:"User logged in successfully"});
      setUser(response.data.user);
      localStorage.setItem("token",response.data.token);
      navigate("/start-home");
    }
    
    setEmail(' ');
    setPassword(' ');
  }
  useEffect(() => {
    console.log("Updated user:", user);
  }, [user]);
  return (
  
    <div className="h-screen flex flex-col items-center justify-center">
     
      <div className='w-full ml-10 mt-10'> <img className="h-10 " src={fleet} alt="Fleet Logo" /></div>
      <div className='my-8 h-screen mx-8 flex flex-col justify-between '>
      <form className=" flex flex-col justify-between" onSubmit={(e)=>{
        submitUserData(e);
        
      }}>
         <h2 className='text-3xl font-bold '>Enter Email</h2>
         <input className="w-full bg-gray-200 placeholder:text-2xl px-2 py-5 my-4" type="email" required placeholder='email123@gmail.com' 
         value={Email} 
         onChange={(e)=>{
          setEmail(e.target.value)
         }} />
         <h2  className='text-3xl font-bold' >Enter Password</h2>
         <input value={Password} onChange={(e)=>{
          setPassword(e.target.value)
         }} className="w-full bg-gray-200 placeholder:text-2xl px-2 py-5 my-4" type="password" required placeholder='password' />
         <button className="flex justify-center items-center w-full mb-1 bg-[#00B894] text-white  text-2xl font-bold py-5 my-5 rounded-2xl">Login</button>
         <p className=" mt-2 text-center text-2xl font-bold">New here ? <Link to="/signup" className="text-blue-700 underline">Create new Account</Link></p>
      </form>
      <Link to="/captain-login" className='flex justify-center items-center bg-[#2988d1] text-white py-5 text-2xl font-bold rounded-xl'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin