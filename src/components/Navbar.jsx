import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { MyContext } from '../context/Context';
import { FaHome } from "react-icons/fa";
import { toast } from 'react-toastify';
import axios from 'axios';
import { FcAbout } from "react-icons/fc";
import { MdEventAvailable } from "react-icons/md";
import { IoIosGitPullRequest } from "react-icons/io";
import { GiOpenedFoodCan } from "react-icons/gi";
import { MdManageHistory } from "react-icons/md";

function Navbar() {

  const navigate = useNavigate()

  const{theme , toggleTheme ,setUser , user , logoutUser} = useContext(MyContext)



  const links = [
    { to: "/", label: "Home" , logo: <FaHome /> },
    {to: '/available-foods' , label: 'Available Food' , logo: <MdEventAvailable /> },
    { to: "/about", label: "About" , logo: <FcAbout /> },
  ];
  const userLinks = [
    { to: "/", label: "Home" , logo: <FaHome /> },
     {to: '/available-foods' , label: 'Available Food' , logo: <MdEventAvailable /> },
     {to: "/my-food-req" , label:"My Food Request" , logo: <IoIosGitPullRequest />},
    { to: "/about", label: "About" , logo: <FcAbout /> },
  ];
  const donorLinks = [
    { to: "/", label: "Home" , logo: <FaHome /> },
     {to: '/available-foods' , label: 'Available Food' , logo: <MdEventAvailable /> },
     {to: "/add-food" , label:"Add Food" , logo: <GiOpenedFoodCan />},
     {to: `/manage-my-food` , label:"Manage Foods" , logo: <MdManageHistory />},
     {to: `/req-manage` , label:"Food Request" , logo: <IoIosGitPullRequest />},
    { to: "/about", label: "About" , logo: <FcAbout /> },
  ];

  const handleLogout = async ()=>{
       try {
        const res = await axios.get("https://nohunger-project.vercel.app/api/users/logout")
        if(res.data.success){
          setUser(null)
          logoutUser()
          toast(res.data.message)
           setTimeout(() => {
            navigate("/login")
           }, 1000);
        }
       } catch (error) {
        console.log(error)
       }
  }

  return (
    <div className=' bg-violet-400 dark:bg-gray-900 dark:text-white shadow-md fixed top-0 left-0 w-full z-10'>
      <div className="navbar  w-[90%] mx-auto ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-10 mt-3 w-52 p-2 shadow gap-1 bg-violet-400 dark:bg-gray-900 "
          >
            { !user &&
            
            links.map((link, index) => (
             <li key={index}>
        
               <NavLink
                 to={link.to}
                 className={({ isActive }) =>
                   isActive ? "border-x-2  font-bold border-violet-800 rounded-lg dark:border-white hover:bg-violet-500 dark:hover:bg-gray-700" : "hover:bg-violet-500 dark:hover:bg-gray-700"}
               >
                {link.logo}
                 {link.label}
               </NavLink>
             </li> 
             
           ))}
            { user?.role === "user" &&
            
             userLinks.map((link, index) => (
              <li key={index}>
              
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive ? "border-x-2  font-bold border-violet-800 rounded-lg dark:border-white hover:bg-violet-500 dark:hover:bg-gray-700" : "hover:bg-violet-500 dark:hover:bg-gray-700"}
                >
                  {link.logo}
                  {link.label}
                </NavLink>
              </li> 
              
            ))}
            { user?.role === "donor" &&
            
            donorLinks.map((link, index) => (
             <li key={index}>
            
               <NavLink
                 to={link.to}
                 className={({ isActive }) =>
                   isActive ? "border-x-2  font-bold border-violet-800 rounded-lg dark:border-white hover:bg-violet-500 dark:hover:bg-gray-700" : "hover:bg-violet-500 dark:hover:bg-gray-700"}
               >
                {link.logo}
                 {link.label}
               </NavLink>
             </li> 
             
           ))}
          </ul>
        </div>
        <a className="px-4 font-bold text-2xl">NoHunger</a>
        {
          <div className='cursor-pointer' onClick={()=> toggleTheme()}>
            {theme === "light" ?   <MdDarkMode size={22}/> :
            <MdLightMode size={22} />}
          </div>
        }
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
        { !user &&
            
            links.map((link, index) => (
             <li key={index}>
               
               <NavLink
                 to={link.to}
                 className={({ isActive }) =>
                   isActive ? "border-x-2  font-bold border-violet-800 rounded-lg dark:border-white hover:bg-violet-500 dark:hover:bg-gray-700" : "hover:bg-violet-500 dark:hover:bg-gray-700"}
               >
                {link.logo}
                 {link.label}
               </NavLink>
             </li> 
             
           ))}
            { user?.role === "user" &&
            
             userLinks.map((link, index) => (
              <li key={index}>
                
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive ? "border-x-2  font-bold border-violet-800 rounded-lg dark:border-white hover:bg-violet-500 dark:hover:bg-gray-700" : "hover:bg-violet-500 dark:hover:bg-gray-700"}
                >
                  {link.logo}
                  {link.label}
                </NavLink>
              </li> 
              
            ))}
            { user?.role === "donor" &&
            
            donorLinks.map((link, index) => (
             <li key={index}>
              
               <NavLink
                 to={link.to}
                 className={({ isActive }) =>
                   isActive ? "border-x-2  font-bold border-violet-800 rounded-lg dark:border-white hover:bg-violet-500 dark:hover:bg-gray-700" : "hover:bg-violet-500 dark:hover:bg-gray-700"}
               >
                {link.logo}
                 {link.label}
               </NavLink>
             </li> 
             
           ))}
        </ul>
      </div>
      <div className="navbar-end ">
      {
     user && (
    <Link to={'/profile'} className='mr-5 cursor-pointer group relative inline-block'>
      <img className='w-10 h-10 rounded-full object-cover' src={user?.photoURL } alt="profile" />
      
      <span className='absolute -left-12 top-12/10  bg-white dark:bg-gray-900 px-2 py-1 rounded shadow text-sm whitespace-nowrap invisible group-hover:visible'>
        {user?.fullName} | visit profile
      </span>
    </Link>
  )
}
        {
          user?  <button onClick={handleLogout} className="btn shadow-none hover:scale-105 text-gray-100 bg-violet-500 border-0 dark:bg-gray-700">Logout</button> :
          <div className='flex gap-2'> 
            <Link to={"/login"} className="btn shadow-none hover:scale-105 dark:text-white bg-violet-500 border-0 dark:bg-gray-700 ">Login</Link> <Link to={"/register"} className="btn shadow-none hover:scale-105 dark:text-white bg-violet-500 border-0 dark:bg-gray-700">Register</Link>

          </div>
        }
        
      </div>
    </div>
    </div>
  )
}

export default Navbar
