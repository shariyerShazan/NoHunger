import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
// import { MyContext } from '../context/Context';
import { toast, ToastContainer } from 'react-toastify';
import { MyContext } from '../../context/Context';
import AOS from "aos";
import "aos/dist/aos.css";

const MyFoodRequests = () => {

    useEffect(()=>{
      document.title = "FoodRequest | NoHunger"
    }, [])
    

  useEffect(() => {
      AOS.init({ duration: 1200, once: false });
    }, []);

  const { user } = useContext(MyContext);
  const [foodReq, setFoodReq] = useState([]);

  useEffect(() => {
    const fetchFoodRequests = async () => {
      try {
        const res = await axios.get(`https://nohunger-project.vercel.app/api/request/requests-by-user/${user._id}`);
        setFoodReq(res.data.requests); 
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchFoodRequests();
  }, [user._id]);


  const cancelFoodReq = async (foodId) => {
    try {
      await axios.delete(`https://nohunger-project.vercel.app/api/request/cancel-request/${foodId}`, {
        data: { userId: user._id }
      });

      setFoodReq(prev => prev.filter(req => {
        const matchFoodId = typeof req.foodId === 'object' ? req.foodId._id : req.foodId;
        return !(matchFoodId === foodId && req.requesterId === user._id);
      }));

      toast.success("Request cancelled successfully");
    } catch (error) {
      console.error("Cancel error:", error);
      toast.error("Failed to cancel request");
    }
  };

  return (
    <div className="p-6 bg-violet-300 dark:bg-gray-800 min-h-[70vh]">
      <ToastContainer />
      <div className='w-[90%] mx-auto'>
      <h2 className="text-3xl font-bold text-center text-violet-600 dark:text-white mb-6">
        My Food Requests
      </h2>

      {foodReq.length === 0 ? (
        <p className="text-center text-gray-800 dark:text-white text-xl">No requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className=''>
              <tr className="bg-violet-100 dark:bg-gray-200 text-left ">
                <th className="p-3">Image</th>
                <th className="p-3">Food Name</th>
                <th className="p-3">Requested On</th>
                <th className="p-3">Exprired In</th>
                <th className="p-3">Pick Location</th>
                <th className="p-3 text-center">Action</th>
                <th className="p-3 ">Status</th>
                
              </tr>
            </thead>
            <tbody>
              {foodReq.map((req, index) => (
                <tr
                data-aos="fade-up"
                data-aos-delay={index * 300}
                 key={index} className="border-b dark:border-gray-600 hover:bg-violet-100 dark:hover:bg-gray-800">
                  <td className="p-3">
                    <img
                      src={req.foodId.foodImage}
                      alt={req.foodId.foodName}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 text-black dark:text-white font-bold">
                    {req.foodId.foodName}
                  </td>
                  <td className="p-3 text-black dark:text-gray-300 font-bold">
                    {req.requestedAt?.slice(0, 10)}
                  </td>
                  <td className="p-3 text-black dark:text-white font-bold">
                    {req.foodId.expriredIn} Days
                  </td>
                  <td className="p-3 text-black dark:text-white font-bold">
                    {req.foodId.pickLocation} 
                  </td>
                  
                  <td className="p-3 text-center">
                    <button
                      onClick={() => cancelFoodReq(req.foodId._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
                    >
                      Cancel
                    </button>
                  </td>
                  <td className={`p-3 font-bold ${req.status== "Pending"? "dark:text-blue-500 text-blue-700 ": req.status== "Approved"? "text-green-500" : "text-red-500" }`}>
                    {req.status} 
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  );
};

export default MyFoodRequests;
