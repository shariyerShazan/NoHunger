import axios from "axios";
import React, {  useEffect, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
// import { MyContext } from "../context/Context";

function Register() {
    useEffect(()=>{
      document.title = "Register | NoHunger"
    }, [])
    



  const [showPass, setShowPass] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e)=>{
    e.preventDefault()
    const fullName = e.target.fullName.value
    const photoURL = e.target.photoURL.value
    const email = e.target.email.value
    const password = e.target.password.value
    const role = e.target.role.value
    try {
      const res = await axios.post("https://nohunger-project.vercel.app/api/users/register", {
        fullName,
        photoURL,
        email,
        password ,
        role
      });
  
      if (res.data.success) {
        e.target.reset()
        toast(res.data.message);
        setErrorMessage("");
        setTimeout(() => {
          
          navigate("/login")
        }, 1000);
      } else {
        setErrorMessage(res.data.message || "Registration failed.");
      }
  
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    }
 
  }
  

  

  return (
    <div className="flex justify-center items-center bg-violet-300 dark:bg-gray-800 min-h-[80vh]">
      <ToastContainer />
      <form onSubmit={handleRegister} action="" className=" dark:text-black">
        <fieldset className="fieldset  bg-violet-100 dark:bg-white  rounded-box w-xs p-4 border-y-3 dark:border-y-18 dark:border-white  ">
          <legend className="fieldset-legend text-xl dark:text-gray-800">Register</legend>

          <label className="label text-md font-bold ">Name</label>
          <input type="text" name="fullName" className="input" placeholder="FullName" />

          <label className="label text-md font-bold ">Name</label>
          <input type="text" name="photoURL" className="input" placeholder="photoURL" />

          <label className="label text-md font-bold ">Email</label>
          <input type="email" name="email" className="input" placeholder="Email" />


          <div>
<legend className="label text-md font-bold ">Role</legend>
  <select name="role" defaultValue="Pick a browser" className="select cursor-pointer">
    <option disabled={true}>Select a role</option>
    <option value={'user'}>User</option>
    <option value={'donor'}>Donor</option>
  </select>
</div>

          <div  className="relative">
          <label className="label text-md font-bold">Password</label>
          <input required type={`${showPass? "password": "text"}`} name="password" className="input z-0" placeholder="Password" />
        {
          showPass?
            <IoMdEye  onClick={()=>setShowPass(!showPass)} className=" absolute left-64 top-7.5 cursor-pointer" size={20}/> :
            <IoMdEyeOff onClick={()=>setShowPass(!showPass)}  className=" absolute left-64 top-7.5 cursor-pointer" size={20}/>
            }


          {
            <span className="text-red-500">{errorMessage}</span>
          }
          </div>
          <button type="submit" className="btn border-none shadow-none bg-violet-400 hover:bg-violet-500 mt-4">Register</button>
          <span>Already have an account? <Link to={'/login'} className="text-violet-500 font-bold" >Login</Link> </span>
        </fieldset>
      </form>
    </div>
  );
}

export default Register;
