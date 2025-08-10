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
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-violet-200 to-violet-400 dark:from-gray-800 dark:to-gray-900 px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
  
          {/* Photo URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Photo URL
            </label>
            <input
              type="text"
              name="photoURL"
              placeholder="Enter your photo URL"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
  
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
  
          {/* Role */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Role
            </label>
            <select
              name="role"
              required
              className="w-full px-4 py-2 border rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option value="">Select a role</option>
              <option value="user">User</option>
              <option value="donor">Donor</option>
            </select>
          </div>
  
          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <div
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-9 text-gray-500 cursor-pointer"
            >
              {showPass ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
            </div>
          </div>
  
          {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
  
          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-violet-500 text-white py-2 rounded-lg hover:bg-violet-600 transition-colors font-semibold"
          >
            Register
          </button>
        </form>
  
        {/* Login Link */}
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-violet-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
  
}

export default Register;
