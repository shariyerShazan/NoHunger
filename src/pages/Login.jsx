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
    
    const {setUser ,
       googleLoginUser ,
      // googleLoginDonor
       } = useContext(MyContext)

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
  
  const handleGoogleLoginUser =async ()=>{
    try {
      const googleUser = await googleLoginUser();
     

      const res = await axios.post(`https://nohunger-project.vercel.app/api/users/firebase`, googleUser, { withCredentials: true });

      if (res.data.success) {
       setUser(res.data.user);
        toast.success(res.data.message || "Login successful");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message || "Google login failed");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-violet-200 to-violet-400 dark:from-gray-800 dark:to-gray-900 px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
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

          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-violet-500 text-white py-2 rounded-lg hover:bg-violet-600 transition-colors font-semibold"
          >
            Login
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLoginUser}
          className="w-full mt-4 flex items-center justify-center gap-2 border py-2 rounded-lg bg-white hover:bg-gray-100 transition-colors font-medium text-gray-700"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Login with Google as User
        </button>

        {/* Register Link */}
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-violet-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
