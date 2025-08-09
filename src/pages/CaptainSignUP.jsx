import React from 'react'
import { Link } from 'react-router-dom'
import Input from "../Components/input"
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react'
import fleet from "../assets/img/fleet1.png"
const CaptainSignUP = () => {
  const navigate = useNavigate();
  const [formData,setformData]=useState({
    firstname:"",
    lastname:"",
  email:"",
  password:"",
  vehiclecolor:"",
  vehicleplate:"",
  vehiclecapcity:"",
  vehicletype:""
  
})
const handlechange =(field,value)=>{
 setformData({...formData ,[field]:value});
};

const handlesubmit =async (e)=>{
  e.preventDefault();
  console.log(formData);
  const newcaptain = {
    fullname:{
      firstname:formData.firstname,
      lastname:formData.lastname,
    },
    email:formData.email,
    password:formData.password,
    vehicle:{
      color:formData.vehiclecolor,
      plate:formData.vehicleplate,
      capacity:formData.vehiclecapcity,
      vehicleType:formData.vehicletype
    }      }
  const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,newcaptain);
  if(response.status===200){
    localStorage.setItem("token",response.data.token);
    console.log(response.data);
    alert("Captain registered successfully");
    navigate('/captain-login');
  }
  else{
    alert("Something went wrong");
  }
   
}
return (
  <div className='h-screen flex flex-col '>
    <div className=' w-full ml-5 mt-10'> <img className="h-10" src={fleet}></img></div>
    <div className=' h-screen flex flex-col justify-between py-8 mx-9'>
      <form onSubmit={handlesubmit} action="" className=''>
        <h2 className="text-2xl font-bold">Where's your name</h2>
        <Input config={{type:"text",placeholder:"First name" ,width:"w-[48%]"}} value={formData.firstname} onChange={(e)=>{
       handlechange("firstname",e.target.value)
        }}/>
        <Input config={{type:"text",placeholder:"last name" ,width:"w-[48%] " ,margin:"ml-2"}} value={formData.lastname} onChange={(e)=>{
          handlechange("lastname",e.target.value);
        }}/>
        <h2 className="text-2xl font-bold">What's your email</h2>
        <Input config={{type:"email" , placeholder:"email123@gmail.com" }} value={formData.email} onChange={(e)=>{
          handlechange("email",e.target.value)
        }}/>
        <h2 className="text-2xl font-bold">Enter Password</h2>
        <Input config={{type:"password" , placeholder:"Enter your password"}} value={formData.password} onChange={(e)=>{
          handlechange("password",e.target.value);
        }}/>
        <h2 className="text-2xl font-bold">Vehicle Color</h2>
        <Input config={{type:"text" ,placeholder:"Enter your Vehicle color"}} value={formData.vehiclecolor} onChange={(e)=>{
          handlechange("vehiclecolor",e.target.value);
        }}/>
        <h2 className="text-2xl font-bold">Vehicle Plate</h2>
        <Input config={{type:"text" ,placeholder:"Enter your Vehicle plate"}} value={formData.vehicleplate} onChange={(e)=>{
          handlechange("vehicleplate",e.target.value);
        }}/>
        <h2 className="text-2xl font-bold">Vehicle Type</h2>
        <Input config={{type:"text" ,placeholder:"'Car','Motorcycle','Auto','Van'"}} value={formData.vehicletype} onChange={(e)=>{
          handlechange("vehicletype",e.target.value);
        }}/>
        <h2 className="text-2xl font-bold">Vehicle Capacity</h2>
        <Input config={{type:"number" ,placeholder:"Enter your Vehicle capacity"}} value={formData.vehiclecapcity} onChange={(e)=>{
          handlechange("vehiclecapcity",e.target.value);
        }}/>
      <button type="submit" className='bg-[#00B894] w-full rounded-2xl py-4 text-white font-bold text-2xl my-3' >Create account</button>
      <p className="text-xl mt-2 font-bold text-center">Already have a account <Link to='/captain-login' className='text-blue-600 underline'>Login Here</Link></p>
      </form>
     <Link to="/signup" className='w-full bg-[#2988d1] flex justify-center items-center py-5 rounded-2xl text-2xl font-bold'>Sign up as User</Link>
 
  </div>
  </div>
)
}

export default CaptainSignUP