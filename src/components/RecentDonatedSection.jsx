import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router";

function RecentDonatedSection() {
  const [recentFoods, setRecentFoods] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  const fetchRecentFoods = async () => {
    try {
      const res = await axios.get("https://nohunger-project.vercel.app/api/food/get-all-food");
      const sortedFoods = res.data.foods
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);
      setRecentFoods(sortedFoods);
    } catch (error) {
      console.error("Error fetching recent foods:", error);
    }
  };

  useEffect(() => {
    fetchRecentFoods();
  }, []);

  return (
    <div className="p-6 bg-violet-300 dark:bg-gray-800 min-h-[70vh]">
      <div className="w-[90%] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center dark:text-white">
          Recent Donated Foods
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {recentFoods.map((food, index) => (
            <div
              key={food._id}
              data-aos="zoom-in"
              data-aos-delay={index * 150}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 max-w-xs border-y-4 border-violet-500 group"
            >
              <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-full h-40 object-cover rounded mb-3 opacity-70 group-hover:opacity-100 duration-300"
              />
              <h3 className="text-xl font-bold text-violet-500">{food.foodName}</h3>
              {/* <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {food.additionalNotes.slice(0, 100)}...
              </p> */}
              <p className="mt-2">
                <span className="font-bold dark:text-white">Donated On:</span>{" "}
                <span className="text-green-500">{food.createdAt.slice(0, 10)}</span>
              </p>
              <p className="dark:text-green-500">
                <span className="font-bold dark:text-white">Location:</span> {food.pickLocation}
              </p>
              <div className="mt-3">
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

        <div className="flex justify-center mt-8">
          <Link
            to="/available-foods"
            className="btn flex justify-center w-32 bg-violet-500 hover:bg-violet-600 border-0 shadow-none text-white py-2 rounded"
          >
            Show All
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecentDonatedSection;
