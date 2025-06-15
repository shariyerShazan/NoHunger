import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { MyContext } from "../context/Context";
// import axios from  "axios"

function Login() {
    useEffect(()=>{
      document.title = "Login | NoHunger"
    }, [])
    
    const {setUser , googleLoginUser ,googleLoginDonor } = useContext(MyContext)

  const [showPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate()
  const location = useLocation()

  const handleLogin = async (e)=>{
    e.preventDefault()
    // const fullName = e.target.fullName.value
    // const photoURL = e.target.photoURL.value
    const email = e.target.email.value
    const password = e.target.password.value
    const role = e.target.role.value
    try {
      const res = await axios.post("https://nohunger-project.vercel.app/api/users/login", {
        // fullName,
        // photoURL,
        email,
        password,
        role
      });
  
      if (res.data.success) {
        e.target.reset()
        toast(res.data.message);
        setErrorMessage("");
        setTimeout(() => {
          setUser(res.data.user)
          navigate( location.state?.from || "/" , { replace: true })
        }, 1000);
      } else {
        setErrorMessage(res.data.message || "Registration failed.");
      }
  
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    }
  
  }
  
  const handleGoogleLoginUser = ()=>{
    googleLoginUser()
    setTimeout(() => {
      // setUser(res.data.user)
      navigate("/")
    }, 1000);
  }
  const handleGoogleLoginDonor = ()=>{
    googleLoginDonor()
    setTimeout(() => {
      // setUser(res.data.user)
      navigate("/")
    }, 1000);
  }

  return (
    <div className="flex justify-center items-center bg-violet-300 dark:bg-gray-800 min-h-[80vh]">
      <ToastContainer />
      <form onSubmit={handleLogin} action="" className=" dark:text-black">
        <fieldset className="fieldset  bg-violet-100 dark:bg-white  rounded-box w-xs p-4 border-y-3 dark:border-y-18 dark:border-white  ">
          <legend className="fieldset-legend text-xl dark:text-gray-800">
            Login
          </legend>

          <label className="label text-md font-bold ">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
          />

<div>
<legend className="label text-md font-bold ">Role</legend>
  <select name="role" defaultValue="Pick a browser" className="select cursor-pointer">
    <option disabled={true}>Select a role</option>
    <option value={'user'}>User</option>
    <option value={'donor'}>Donor</option>
  </select>
</div>

          <div className="relative">
            <label className="label text-md font-bold">Password</label>
            <input
              type={`${showPass ? "password" : "text"}`}
              name="password"
              className="input z-0 "
              placeholder="Password"
            />
              {showPass ? (
                <IoMdEye onClick={() => setShowPass(!showPass)} className="absolute left-64 top-7.5 cursor-pointer" size={20} />
              ) : (
                <IoMdEyeOff onClick={() => setShowPass(!showPass)} className=" absolute left-64 top-7.5 cursor-pointer" size={20} />
              )}
          </div>

          {
            <span className="text-red-500">{errorMessage}</span>
          }

          <button type="submit" className="btn border-none shadow-none bg-violet-400 hover:bg-violet-500 mt-4">
            Login
          </button>
          {
            <span>Don't have an account? <Link to={'/register'} className="text-red-500 font-bold" >Register</Link> </span>
          }

          <button onClick={handleGoogleLoginUser} className="btn bg-white text-black border-[#e5e5e5] hover:scale-101 mt-2">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google as a User
          </button>
          <button onClick={handleGoogleLoginDonor} className="btn bg-white text-black border-[#e5e5e5] hover:scale-101 mt-2">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google as a Donor
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
