import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const images = [
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSojpB70t67grE6jGgJpfq702_tqbKGb49xLQ&s",
    title: "Feeding the Needy"
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg-MtnzwiZqUWJDi8RZRxNSnPYg47zCfHLdw&s",
    title: "Community Support"
  },
  {
    url: "https://static.vecteezy.com/system/resources/thumbnails/000/184/578/small/Food_Drive_Vector.jpg",
    title: "Food Drive"
  },
  {
    url: "https://media.istockphoto.com/id/1223169200/vector/food-and-grocery-donation.jpg?s=612x612&w=0&k=20&c=0fv8hwXeS9RCL-ewqkr2oyi0Nu8jAQxGtroS0XA9nsQ=",
    title: "Grocery Donations"
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_DTZGmuD01A-vVN10QnBORgabytr4YfG-Aw&s",
    title: "No Wastage"
  }
];

const About = () => {
    useEffect(()=>{
      document.title = "About | NoHunger"
    }, [])
    
  return (
    <div className="bg-violet-300 dark:bg-gray-800 text-gray-800 dark:text-gray-100 min-h-screen px-4 py-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-violet-600 dark:text-violet-400 mb-8">
          About NoHunger
        </h1>

        <p className="text-center text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
          NoHunger is dedicated to eliminating food waste and feeding the needy. We connect food donors with communities in need, ensuring every meal counts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div 
            className="bg-violet-100 dark:bg-gray-700 p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: -200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
          >
            <h2 className="text-2xl font-semibold text-violet-600 dark:text-violet-300 mb-4">Our Mission</h2>
            <p>
              We want to build a world where food connects us, not divides. NoHunger enables safe, easy, and respectful food donations for a stronger, more caring society.
            </p>
          </motion.div>

          <motion.div 
            className="bg-violet-100 dark:bg-gray-700 p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: -200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
          >
            <h2 className="text-2xl font-semibold text-violet-600 dark:text-violet-300 mb-4">Why We Exist</h2>
            <p>
              Millions suffer from hunger while food is wasted daily. Our platform bridges that gap by promoting donation, awareness, and community support.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={img.url}
                alt={`about-img-${idx}`}
                className="rounded-xl object-cover w-full h-64 shadow-lg"
              />
              <p className="mt-3 text-lg font-medium text-violet-700 dark:text-violet-300">{img.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
