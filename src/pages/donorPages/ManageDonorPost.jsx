import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/Context";
import axios from "axios";
import { Link } from "react-router";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaTableCells } from "react-icons/fa6";
import { PiCardsFill } from "react-icons/pi";

function ManageDonorPost() {
  useEffect(() => {
    document.title = "ManageFood | NoHunger";
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  const [myPosts, setMyPosts] = useState([]);
  const { user, isCardView, toggleCardView } = useContext(MyContext);

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
    const newStatus =
      currentStatus === "Available" ? "Not available" : "Available";

    try {
      await axios.patch(
        `https://nohunger-project.vercel.app/api/food/food-status-update/${id}`,
        { foodStatus: newStatus }
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

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(
            `https://nohunger-project.vercel.app/api/food/delete-by-donor/${id}`
          );
          setMyPosts((prev) => prev.filter((post) => post._id !== id));
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-violet-300 dark:bg-gray-800 min-h-[70vh]">
      <div className="w-[90%] mx-auto py-12">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-violet-700 dark:text-white mb-3">
            Manage Your Food Donations
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-6">
            Your generosity is making a difference. Keep track of your food
            donations, update their status, or make changes anytime.
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

          <button
            onClick={toggleCardView}
            className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-900 dark:border-white text-gray-900 dark:text-white px-4 py-2 rounded font-semibold ml-4 mt-2 hover:bg-violet-500 hover:text-white"
          >
            {isCardView === "card" ? (
              <>
                <FaTableCells /> Table View
              </>
            ) : (
              <>
                <PiCardsFill /> Card View
              </>
            )}
          </button>
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
        ) : isCardView === "card" ? (
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {myPosts.map((post, index) => (
              <div
                key={post._id}
                data-aos="flip-left"
                data-aos-delay={index * 100}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 max-w-xs"
              >
                <img
                  src={post.foodImage}
                  alt={post.foodName}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h3 className="text-xl font-bold text-violet-500 mb-1">
                  {post.foodName}
                </h3>
                <p
                  className={`font-semibold ${
                    post.foodStatus === "Available"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  Status: {post.foodStatus}
                </p>
                <div className="mt-3 space-y-2">
                  <button
                    onClick={() =>
                      handleStatusToggle(post._id, post.foodStatus)
                    }
                    className={`w-full py-1 rounded text-white cursor-pointer ${
                      post.foodStatus === "Available"
                        ? "bg-yellow-400 hover:bg-yellow-500"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {post.foodStatus === "Available"
                      ? "Mark as Not available"
                      : "Mark as Available"}
                  </button>
                  <div className="flex gap-2">
                    <Link
                      to={`/update-donor-post/${post._id}`}
                      className="w-full text-center bg-violet-500 hover:bg-violet-600 text-white py-1 rounded cursor-pointer"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="w-full text-center bg-red-500 hover:bg-red-600 text-white py-1 rounded cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto mt-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <table className="min-w-full text-sm text-left dark:text-white">
              <thead className="bg-violet-500 text-white">
                <tr>
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myPosts.map((post, index) => (
                  <tr
                    key={post._id}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="border-b dark:border-gray-700 hover:bg-violet-50 dark:hover:bg-gray-800"
                  >
                    <td className="py-2 px-4">
                      <img
                        src={post.foodImage}
                        alt={post.foodName}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-4 font-bold">{post.foodName}</td>
                    <td
                      className={`py-2 px-4 font-semibold ${
                        post.foodStatus === "Available"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {post.foodStatus}
                    </td>
                    <td className="py-2 px-4 space-y-1">
                      <button
                        onClick={() =>
                          handleStatusToggle(post._id, post.foodStatus)
                        }
                        className={`w-full py-1 rounded text-white cursor-pointer ${
                          post.foodStatus === "Available"
                            ? "bg-yellow-400 hover:bg-yellow-500"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {post.foodStatus === "Available"
                          ? "Mark as Not available"
                          : "Mark as Available"}
                      </button>
                      <div className="flex gap-2 mt-1">
                        <Link
                          to={`/update-donor-post/${post._id}`}
                          className="w-full text-center bg-violet-500 hover:bg-violet-600 text-white py-1 rounded cursor-pointer"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="w-full text-center bg-red-500 hover:bg-red-600 text-white py-1 rounded cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
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
}

export default ManageDonorPost;
