// src/pages/donorPages/ManageDonorPost.jsx
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/Context";
import axios from "axios";
import { Link } from "react-router";
import Swal from "sweetalert2"
import AOS from "aos";
import "aos/dist/aos.css";

function ManageDonorPost() {

    useEffect(()=>{
      document.title = "ManageFood | NoHunger"
    }, [])
    

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  const [myPosts, setMyPosts] = useState([]);
  const { user } = useContext(MyContext);

  useEffect(() => {
    if (!user?._id) return;

    const fetchFood = async () => {
      try {
        const res = await axios.get(
          `https://nohunger-project.vercel.app/api/food/get-donor-food/${user._id}`
        );
        setMyPosts(res.data.foods);
      } catch (error) {
        console.error("Error fetching food:", error);
      }
    };

    fetchFood();
  }, [user]);

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "Available" ? "Not available" : "Available";

    try {
      const res = await axios.patch(
        `https://nohunger-project.vercel.app/api/food/food-status-update/${id}`,
        {
          foodStatus: newStatus,
        }
      );

      setMyPosts((prev) =>
        prev.map((food) =>
          food._id === id ? { ...food, foodStatus: newStatus } : food
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const handleDelete = async (id)=>{
      try {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
           axios.delete(`https://nohunger-project.vercel.app/api/food/delete-by-donor/${id}`)
      setMyPosts((prev) => prev.filter((post) => post._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        });
        
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className="bg-violet-300 dark:bg-gray-800 ">
     <div className="w-[90%] mx-auto py-12">
     <div className="w-[90%] mx-auto pt-10 pb-6 text-center">
  <h1 className="text-3xl md:text-4xl font-extrabold text-violet-700 dark:text-white mb-3">
    Manage Your Food Donations
  </h1>
  <p className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-6">
    Your generosity is making a difference. Keep track of your food donations,
    update their status, or make changes anytime.
  </p>
  <img
    src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
    alt="Donation Illustration"
    className="mx-auto w-24 h-24 mb-4 animate-bounce"
  />
  <Link
    to="/add-food"
    className="inline-block bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded font-semibold transition"
  >
    + Add New Donation
  </Link>
</div>
     {myPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <img
            src="https://static.vecteezy.com/system/resources/previews/026/729/339/non_2x/no-food-allowed-diet-mark-dietary-restriction-vector.jpg"
            alt="No food found"
            className="w-32 h-32 mb-4 opacity-70"
          />
          <p className="text-2xl font-bold text-gray-700 dark:text-white">
            Donate first
          </p>
          <Link
            to="/add-food"
            className="btn bg-violet-400 mt-4 px-4 py-2 rounded text-white hover:bg-violet-500"
          >
            Add donate list Now
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {myPosts.map((post, index) => (
            <div
            data-aos="flip-left"
            data-aos-delay={index * 300} 

              key={index}
              className="border-y-5 shadow-xl dark:border-violet-500 border-gray-900 rounded-xl  p-4 flex flex-col items-center bg-gray-100 max-w-56 group"
            >
              <img
                className="w-56 h-40 object-cover rounded-md mb-2 group-hover:-translate-y-18 duration-800"
                src={post?.foodImage}
                alt={post.foodName}
              />
              <p className="text-xl font-bold mb-2 group-hover:-translate-y-18 duration-800">{post.foodName}</p>
              <p
                className={`mb-2 font-semibold group-hover:-translate-y-18 duration-800 ${
                  post.foodStatus === "Available"
                    ? "text-green-600"
                    : "text-yellow-500"
                }`}
              >
                Status: {post.foodStatus}
              </p>
              <div className="group-hover:-translate-y-18 duration-800">
              <button
                onClick={() => handleStatusToggle(post._id, post.foodStatus)}
                className={`btn px-4 py-2 rounded  ${
                  post.foodStatus === "Available"
                    ? "bg-yellow-400  text-white hover:bg-yellow-500"
                    : "bg-green-500 px-7 text-white hover:bg-green-600"
                }`}
              >
                {post.foodStatus === "Available"
                  ? "Mark as Not available"
                  : "Mark as Available"}
              </button>
              <div className="flex gap-2 my-1 ">
              <Link to={`/update-donor-post/${post._id}`} className="btn px-7 bg-violet-500 hover:bg-violet-600">
                Edit
              </Link>
              <button onClick={()=>handleDelete(post._id)} className="btn px-5 bg-red-500 hover:bg-red-600">
                Delete
              </button>
              </div>
              </div>
            </div>
          ))}
        </div>
      )}
     </div>
    </div>
  );
}

export default ManageDonorPost;
