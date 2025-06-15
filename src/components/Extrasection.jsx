import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { MyContext } from '../context/Context';
import AOS from "aos";
import "aos/dist/aos.css";
// import { toast, ToastContainer } from 'react-toastify';
import {Link} from "react-router"
// import { FaTableCells } from "react-icons/fa6";
// import { PiCardsFill } from "react-icons/pi";

function Extrasection() {
    useEffect(()=>{
      document.title = "AvailableFood | NoHunger"
    }, [])
    

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  const [availableFood, setAvailableFood] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { user , toggleCardView, isCardView } = useContext(MyContext);
//   const [foodReq, setFoodReq] = useState([]);
 

  const fetchFood = async () => {
    try {
      const res = await axios.get("https://nohunger-project.vercel.app/api/food/get-all-food", {
        // params: { keyword: searchTerm }
      });
      setAvailableFood(res.data.foods.filter(food => food.foodStatus === "Available"));
    } catch (error) {
      console.error("Error fetching food:", error);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

//   useEffect(() => {
//     const fetchFoodReq = async () => {
//       try {
//         const res = await axios.get(`https://nohunger-project.vercel.app/api/request/requests-by-user/${user._id}`);
//         setFoodReq(res.data.requests);
//       } catch (error) {
//         console.error("Error fetching food requests:", error);
//       }
//     };

//     fetchFoodReq();
//   }, []);

//   const handleFoodRequest = async (foodId) => {
//     try {
//       const res = await axios.post("https://nohunger-project.vercel.app/api/request/create-request", {
//         foodId: foodId,
//         requesterId: user._id
//       });

//       if (res.data.success) {
//         toast.success(res.data.message);
//         setFoodReq(prev => [...prev, res.data.request]);
//       } else {
//         toast.warn(res.data.message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("Something went wrong");
//     }
//   };

//   const cancelFoodReq = async (foodId) => {
//     try {
//       await axios.delete(`https://nohunger-project.vercel.app/api/request/cancel-request/${foodId}`, {
//         data: { userId: user._id }
//       });

//       setFoodReq(prev => prev.filter(req => {
//         const matchFoodId = typeof req.foodId === 'object' ? req.foodId._id : req.foodId;
//         return !(matchFoodId === foodId && req.requesterId === user._id);
//       }));

//       toast.success("Request cancelled successfully");
//     } catch (error) {
//       console.error("Cancel error:", error);
//       toast.error("Failed to cancel request");
//     }
//   };

//   const alreadyRequested = (foodId) =>
//     foodReq.some(req => {
//       const reqFoodId = typeof req.foodId === 'object' ? req.foodId._id : req.foodId;
//       return req.requesterId === user._id && reqFoodId === foodId;
//     });

  return (
    <div className='p-6 bg-violet-300 dark:bg-gray-800 min-h-[70vh]'>
      {/* <ToastContainer /> */}
      <div className="w-[90%] mx-auto">

      <h2 className="text-5xl font-bold mb-4 text-center dark:text-white">Foods on NoHunger</h2>

          <div className="flex flex-wrap justify-center gap-4">
            {availableFood.slice(0, 4).map((food, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay={index * 300}
                key={food._id}
                className="bg-white rounded-xl border-x-5 border-y-0 border-gray-800 dark:border-violet-500 p-4 border w-80 group shadow-xl"
              >
                <img
                  src={food.foodImage}
                  alt={food.foodName}
                  className="w-full h-40 object-cover border-y-4 border-violet-500 rounded-tr-4xl rounded-bl-4xl mb-3 opacity-50 duration-500 group-hover:opacity-100"
                />
                <h3 className="text-2xl font-bold text-violet-500">{food.foodName}</h3>
                <p><span className='font-bold'>Quantity:</span> {food.quantity} Unit</p>
                <p><span className='font-bold'>Status:</span> <span className='text-green-500'>{food.foodStatus}</span></p>
                <p><span className='font-bold'>Created At:</span> <span className='text-green-500'>{food.createdAt.slice(0, 10)}</span></p>
                <p><span className='font-bold'>Expired In:</span> <span className='text-green-500'>{food.expriredIn} Days</span></p>
                <p><span className='font-bold'>Location:</span> {food.pickLocation}</p>
                <p className="h-30 text-sm text-gray-600 mt-2">{food.additionalNotes.slice(0, 250)}</p>

              
              </div>
            ))}
          </div >
          <div className='flex justify-center mt-8'>
          <Link to={"/available-foods"} className='btn flex justify-center w-32 bg-violet-500 hover:bg-violet-600 border-0 shadow-none'>
            Show All
          </Link>
         </div>

      </div>
    </div>
  );
}

export default Extrasection;
