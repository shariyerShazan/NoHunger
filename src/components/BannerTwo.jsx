// src/components/BannerTwo.jsx
import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const imageUrls = [
  "https://www.nutravita.co.uk/cdn/shop/articles/iStock-844466876.jpg?v=1714509632",
  "https://hips.hearstapps.com/hmg-prod/images/colorful-cereals-with-milk-royalty-free-image-1746810358.pjpeg?crop=0.67774xw:1xh;center,top&resize=640:*",
  "https://media.assettype.com/thequint%2F2022-04%2F9bb03208-8222-43e9-b17e-504fb7f76ccc%2FHealthy_food_shopping_grocery_list_india_diet_healthy_weight_loss_secret_tip.jpg?auto=format%2Ccompress&fmt=webp&width=720",
  "https://i.insider.com/5d4203fb36e03c28a1020308?width=700"
];

const BannerTwo = () => {
  const getOscillation = (index) => {
    const xValue = index % 2 === 0 ? 300 : -300;
    return {
      x: [0, xValue, 0],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }
    };
  };

  return (
    <div className="bg-violet-300 dark:bg-gray-800 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <motion.div
          className="text-center md:text-left flex-1"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight">
            Welcome to <span className="text-violet-600 dark:text-violet-400">HoHunger</span>
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Fight food waste and feed the hungry. Share your meal or find one near you!
          </p>
          <Link
            to="/available-foods"
            className="inline-block mt-6 px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all duration-300"
          >
            See Available Foods
          </Link>
        </motion.div>

        {/* Right Images */}
        <motion.div
          className="flex-1 grid grid-cols-2 gap-4 justify-center items-center"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {imageUrls.map((url, index) => (
            <motion.img
              key={index}
              src={url}
              alt={`Food ${index + 1}`}
              className="w-32 h-32 md:w-36 md:h-36 object-cover bg-white border-y-4 rounded-bl-[30%] rounded-tr-[30%] shadow-lg"
              animate={getOscillation(index)}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BannerTwo;
