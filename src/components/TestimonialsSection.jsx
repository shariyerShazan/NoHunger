import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Sara Ahmed",
    role: "Volunteer",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "NoHunger helped me find food donations easily. Amazing platform that truly cares about the community!",
  },
  {
    id: 2,
    name: "Rafiq Islam",
    role: "Donor",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Donating food has never been easier. The interface is simple and user-friendly. Highly recommended!",
  },
  {
    id: 3,
    name: "Nila Roy",
    role: "Recipient",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Thanks to NoHunger, I was able to get food help during tough times. So grateful for this platform!",
  },
  {
    id: 4,
    name: "John Doe",
    role: "Supporter",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "This platform is a blessing. It connects those in need with those who can help — seamlessly!",
  },
];

function TestimonialsSection() {
  return (
    <section className="bg-violet-300 dark:bg-gray-800 py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-violet-700 dark:text-violet-400 mb-10">
          What People Say About Us
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          grabCursor={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map(({ id, name, role, photo, text }) => (
            <SwiperSlide key={id}>
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center justify-between min-h-[300px]">
                <div className="flex flex-col items-center">
                  <img
                    src={photo}
                    alt={name}
                    className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-violet-500"
                  />
                  <p className="text-gray-700 dark:text-gray-300 italic mb-4 text-sm flex-grow">
                    "{text}"
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-violet-700 dark:text-violet-300">
                    {name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default TestimonialsSection;
