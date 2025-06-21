import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router";

function TopQuantitySection() {
  useEffect(() => {
    document.title = "Top Quantity Food | NoHunger";
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  const [topFoods, setTopFoods] = useState([]);

  const fetchTopFoods = async () => {
    try {
      const res = await axios.get("https://nohunger-project.vercel.app/api/food/get-all-food");
      const availableFoods = res.data.foods.filter(food => food.foodStatus === "Available");
      const sortedFoods = availableFoods
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 6);
      setTopFoods(sortedFoods);
    } catch (error) {
      console.error("Error fetching top quantity foods:", error);
    }
  };

  useEffect(() => {
    fetchTopFoods();
  }, []);

  return (
    <div className='p-6 bg-violet-300 dark:bg-gray-800 min-h-[70vh]'>
      <div className="w-[90%] mx-auto">
        <h2 className="text-5xl font-bold mb-6 text-center dark:text-white">Top Quantity Foods</h2>

        <div className="flex flex-wrap justify-center gap-6">
          {topFoods.map((food, index) => (
            <div
              data-aos="fade-up"
              data-aos-delay={index * 150}
              key={food._id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-300 dark:border-violet-500 overflow-hidden w-80 group transform hover:-translate-y-2 transition duration-300"
            >
              <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-violet-600 dark:text-violet-400 mb-2">
                  {food.foodName}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  <span className="font-semibold">Quantity:</span> {food.quantity} Unit
                </p>
                <p className="text-sm mb-1">
                  <span className="font-semibold dark:text-white">Status:</span>{" "}
                  <span className="text-green-500">{food.foodStatus}</span>
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  <span className="font-semibold">Created At:</span> {food.createdAt.slice(0, 10)}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  <span className="font-semibold">Expires In:</span> {food.expriredIn} Days
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <span className="font-semibold">Location:</span> {food.pickLocation}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  {food.additionalNotes.slice(0, 100)}...
                </p>
                <Link
                  to={`/food-details/${food._id}`}
                  className="inline-block bg-violet-500 hover:bg-violet-600 text-white text-center py-1 px-4 rounded shadow"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link
            to="/available-foods"
            className="btn bg-violet-500 hover:bg-violet-600 text-white py-2 px-6 rounded shadow-md"
          >
            Show All
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopQuantitySection;
