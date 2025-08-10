import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router";

function Extrasection() {
  useEffect(() => {
    document.title = "AvailableFood | NoHunger";
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  const [availableFood, setAvailableFood] = useState([]);

  const fetchFood = async () => {
    try {
      const res = await axios.get("https://nohunger-project.vercel.app/api/food/get-all-food");
      setAvailableFood(res.data.foods.filter(food => food.foodStatus === "Available"));
    } catch (error) {
      console.error("Error fetching food:", error);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  return (
    <div className='p-6 bg-violet-300 dark:bg-gray-800 min-h-[70vh]'>
      <div className="w-[90%] mx-auto">
        <h2 className="text-5xl font-extrabold mb-8 text-center dark:text-white">Foods on NoHunger</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-center gap-6">
          {availableFood.slice(0, 4).map((food, index) => (
            <div
              data-aos="fade-up"
              data-aos-delay={index * 250}
              key={food._id}
              className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-300 dark:border-violet-600 shadow-lg w-80 group overflow-hidden transform hover:-translate-y-2 transition duration-300"
            >
              <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-full h-44 object-cover rounded-t-3xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-5">
                <h3 className="text-2xl font-bold text-violet-700 dark:text-violet-400 mb-3">{food.foodName}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  <span className="font-semibold">Quantity:</span> {food.quantity} Unit
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="text-green-500">{food.foodStatus}</span>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  <span className="font-semibold">Created At:</span> {food.createdAt.slice(0, 10)}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  <span className="font-semibold">Expires In:</span> {food.expriredIn} Days
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  <span className="font-semibold">Location:</span> {food.pickLocation}
                </p>
                {/* <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4 mb-4">
                  {food.additionalNotes}
                </p> */}
                <Link
                  to={`/food-details/${food._id}`}
                  className="inline-block bg-violet-500 hover:bg-violet-600 text-white py-1 px-4 rounded shadow"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className='flex justify-center mt-10'>
          <Link
            to={"/available-foods"}
            className='btn bg-violet-600 hover:bg-violet-700 text-white py-2 px-8 rounded-lg shadow-md transition'
          >
            Show All
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Extrasection;
