import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MyContext } from "../context/Context";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router";
import { FaTableCells } from "react-icons/fa6";
import { PiCardsFill } from "react-icons/pi";

function AvailableFood() {
  useEffect(() => {
    document.title = "AvailableFood | NoHunger";
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  const [availableFood, setAvailableFood] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, toggleCardView, isCardView } = useContext(MyContext);
  const [foodReq, setFoodReq] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchFood = async () => {
    try {
      const res = await axios.get(
        "https://nohunger-project.vercel.app/api/food/get-all-food",
        {
          params: { keyword: searchTerm },
        }
      );
      let foods = res.data.foods.filter(
        (food) => food.foodStatus === "Available"
      );

      foods.sort((a, b) =>
        sortOrder === "asc"
          ? parseInt(a.expriredIn) - parseInt(b.expriredIn)
          : parseInt(b.expriredIn) - parseInt(a.expriredIn)
      );

      setAvailableFood(foods);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching food:", error);
    }
  };

  useEffect(() => {
    fetchFood();
  }, [sortOrder]);

  useEffect(() => {
    const fetchFoodReq = async () => {
      try {
        const res = await axios.get(
          `https://nohunger-project.vercel.app/api/request/requests-by-user/${user._id}`
        );
        setFoodReq(res.data.requests);
      } catch (error) {
        console.error("Error fetching food requests:", error);
      }
    };

    fetchFoodReq();
  }, []);

  const handleFoodRequest = async (foodId) => {
    try {
      const res = await axios.post(
        "https://nohunger-project.vercel.app/api/request/create-request",
        {
          foodId: foodId,
          requesterId: user._id,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setFoodReq((prev) => [...prev, res.data.request]);
      } else {
        toast.warn(res.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };

  const cancelFoodReq = async (foodId) => {
    try {
      await axios.delete(
        `https://nohunger-project.vercel.app/api/request/cancel-request/${foodId}`,
        {
          data: { userId: user._id },
        }
      );

      setFoodReq((prev) =>
        prev.filter((req) => {
          const matchFoodId =
            typeof req.foodId === "object" ? req.foodId._id : req.foodId;
          return !(matchFoodId === foodId && req.requesterId === user._id);
        })
      );

      toast.success("Request cancelled successfully");
    } catch (error) {
      console.error("Cancel error:", error);
      toast.error("Failed to cancel request");
    }
  };

  const alreadyRequested = (foodId) =>
    foodReq.some((req) => {
      const reqFoodId =
        typeof req.foodId === "object" ? req.foodId._id : req.foodId;
      return req.requesterId === user._id && reqFoodId === foodId;
    });

  const totalPages = Math.ceil(availableFood.length / itemsPerPage);
  const paginatedFoods = availableFood.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-violet-300 dark:bg-gray-800 min-h-[70vh]">
      <ToastContainer />
      <div className="w-[90%] mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
          All Available Food
        </h2>

        <div className="flex justify-center mb-6 gap-3 flex-wrap">
          <div className="flex w-full md:w-[50%]">
            <input
              type="text"
              placeholder="Search food by name or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") fetchFood();
              }}
              className="w-full p-2 rounded-l-full border border-gray-900 dark:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-white dark:text-white"
            />
            <button
              onClick={fetchFood}
              className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-r-full cursor-pointer"
            >
              Search
            </button>
          </div>

          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="bg-white border border-gray-900 dark:border-white px-4 btn hover:bg-violet-500 hover:text-white"
          >
            Sort by Expired (
            {sortOrder === "asc" ? "Low to High" : "High to Low"})
          </button>

          <button
            onClick={() => {
              toggleCardView();
            }}
            className="bg-white border border-gray-900 dark:border-white px-4 btn hover:bg-violet-500 hover:text-white"
          >
            {isCardView === "card" ? (
              <FaTableCells size={25} />
            ) : (
              <PiCardsFill size={25} />
            )}
          </button>
        </div>

        {availableFood.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
              alt="No food found"
              className="w-32 h-32 mb-4 opacity-70"
            />
            <p className="text-2xl font-bold text-gray-700 dark:text-white">
              No food found.
            </p>
          </div>
        ) : isCardView === "card" ? (
          <div className="flex flex-wrap justify-center gap-4">
            {paginatedFoods.map((food, index) => (
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
                <h3 className="text-2xl font-bold text-violet-500">
                  {food.foodName}
                </h3>
                <p>
                  <span className="font-bold">Quantity:</span> {food.quantity}{" "}
                  Unit
                </p>
                <p>
                  <span className="font-bold">Status:</span>{" "}
                  <span className="text-green-500">{food.foodStatus}</span>
                </p>
                <p>
                  <span className="font-bold">Created At:</span>{" "}
                  <span className="text-green-500">
                    {food.createdAt.slice(0, 10)}
                  </span>
                </p>
                <p>
                  <span className="font-bold">Expired In:</span>{" "}
                  <span className="text-green-500">{food.expriredIn} Days</span>
                </p>
                <p>
                  <span className="font-bold">Location:</span>{" "}
                  {food.pickLocation}
                </p>
                <p className="h-30 text-sm text-gray-600 mt-2">
                  {food.additionalNotes.slice(0, 250)}
                </p>

                <div className="flex justify-center mt-5">
                  {food.postedBy === user._id ? (
                    <button disabled className="btn bg-violet-500">
                      Your post
                    </button>
                  ) : user.role === "donor" ? (
                    <button disabled className="btn bg-violet-500">
                      Donor Can't request
                    </button>
                  ) : alreadyRequested(food._id) ? (
                    <button
                      onClick={() => cancelFoodReq(food._id)}
                      className="btn bg-red-400 hover:bg-red-500"
                    >
                      Cancel request
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFoodRequest(food._id)}
                      className="btn bg-violet-400 hover:bg-violet-500"
                    >
                      Request
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <table className="min-w-full text-sm text-left dark:text-white">
              <thead className="bg-violet-500 text-white">
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Location</th>
                  <th className="py-2 px-4">Expired In</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Action</th>
                  <th className="py-2 px-4">View More</th>
                </tr>
              </thead>
              <tbody>
                {paginatedFoods.map((food, index) => (
                  <tr
                    data-aos="fade-up"
                    data-aos-delay={index * 300}
                    key={food._id}
                    className="border-b dark:border-gray-700"
                  >
                    <td className="py-2 px-4 font-bold">{food.foodName}</td>
                    <td className="py-2 px-4">{food.quantity}</td>
                    <td className="py-2 px-4">{food.pickLocation}</td>
                    <td className="py-2 px-4">{food.expriredIn} days</td>
                    <td className="py-2 px-4 text-green-500">
                      {food.foodStatus}
                    </td>
                    <td className="py-2 px-4">
                      {food.postedBy === user._id ? (
                        <button disabled className="btn bg-violet-500 ">
                          Your post
                        </button>
                      ) : user.role === "donor" ? (
                        <button disabled className="btn bg-violet-500">
                          Donor Can't
                        </button>
                      ) : alreadyRequested(food._id) ? (
                        <button
                          onClick={() => cancelFoodReq(food._id)}
                          className="btn bg-red-400 hover:bg-red-500"
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          onClick={() => handleFoodRequest(food._id)}
                          className="btn bg-violet-400 hover:bg-violet-500"
                        >
                          Request
                        </button>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      <Link
                        to={`/food-details/${food._id}`}
                        className="btn bg-violet-400 hover:bg-violet-500"
                      >
                        View More...
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {availableFood.length > itemsPerPage && (
          <div className="flex justify-center mt-6 flex-wrap gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded-full border cursor-pointer ${
                  currentPage === index + 1
                    ? "bg-violet-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AvailableFood;
