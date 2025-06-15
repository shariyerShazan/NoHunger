import React from 'react'
import { motion } from 'framer-motion'

function BannerOne() {

  const imageUrls = [
    "https://www.bluechipfcu.org/wp-content/uploads/2019/11/food-donation-scaled.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqUam_R_EwZ-1Gv1zKu7eXtsohJY8MJJp4dBW2ikMaKd9FXDH0ymx-m7YXDjWUeICdCtc&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0QX825RkOgrOsGE6RVm4Nre3x1HMxMcpWTw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSknYCtq42Sam5PxiCryV2CFGSOgFrGyhccVlVvymy5xoVxuckq5SevoHhwLnrbp1VYOdk&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkSbs07h1jYHaAlUXc8uGr1cdGKxm3CmKrBA&s"
  ];

  return (
    <div className="relative">
      <img 
        className='relative w-full h-[60vh] -z-10 object-cover' 
        src="https://media.istockphoto.com/id/1204331594/photo/dramatic-sunset-downtown-chicago.jpg?s=612x612&w=0&k=20&c=mePcGRU-Zvns3USMZWkp8GdQcNmBATo1wMi5CILTKlc=" 
        alt="banner" 
      />

      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[90%] flex flex-wrap justify-center gap-6 z-10">
        {imageUrls.map((url, index) => (
          <motion.img
            key={index}
            src={url}
            alt={`img-${index}`}
            className="w-32 h-32 rounded-br-[30%] rounded-tl-[30%] border-t-5 border-b-5 border-violet-500 object-cover"
            animate={{
              y: [0, (-50 * index)+ 50 , 0 , (50 * index)- 50 , 0],
              transition: {
                duration: 10, 
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default BannerOne
