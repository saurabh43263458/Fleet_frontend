import React ,{useState,useContext}from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import Input from "../Components/input"
import axios from "axios";
import { UserContext } from '../ContextApi/userContextapi';
import fleet from "../assets/img/fleet1.png"
const UserSignUp = () => {
const navigate = useNavigate();
const {user,setUser} =useContext(UserContext);
  const [formData,setformData]=useState({
      firstname:"",
      lastname:"",
    email:"",
    password:"",
  })
  const handlechange =(field,value)=>{
   setformData({...formData ,[field]:value});
  };

 
  
  const handlesubmit =async (e)=>{
    e.preventDefault();
    const newuser = {
      fullname:{
        firstname:formData.firstname,
        lastname:formData.lastname,
      },
      email:formData.email,
      password:formData.password,
    }
    console.log(user)
    const response = axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,newuser)
    console.log(response)
    if(response.status===201){
      console.log({success:true,message:"User created successfully"})
      setUser({name:response.data.fullname.firstname,email:response.data.email})
      localStorage.setItem("token",response.data.token);
    }
    setformData({
        firstname:" ",
        lastname:" ",
      email:" ",
      password:" ",
    })
    navigate("/start-home");
  }
  return (
    <div className='h-screen flex flex-col '>
     
   <div className='w-full ml-5 mt-10'> <img className="h-10" src={fleet} alt="Fleet Logo" /></div>

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
        <button type="submit" className=' bg-[#00B894] w-full rounded-2xl py-4 text-white font-bold text-2xl my-3' >Create account</button>
        <p className="text-xl mt-2 font-bold text-center">Already have a account <Link to="/captain-login" className='text-blue-600'>Login Here</Link></p>
        </form>
       <Link to="/captain-signup" className='w-full bg-[#0984E3] flex justify-center items-center py-5 rounded-2xl text-2xl font-bold'>Sign up as Captain</Link>
   
    </div>
    </div>
  )
}

export default UserSignUp