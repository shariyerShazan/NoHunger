import React from "react";

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
];

function TestimonialsSection() {
  return (
    <section className="bg-violet-300 dark:bg-gray-800 py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-violet-700 dark:text-violet-400 mb-10">
          What People Say About Us
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {testimonials.map(({ id, name, role, photo, text }) => (
            <div
              key={id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 max-w-md mx-auto hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={photo}
                alt={name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-violet-500"
              />
              <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{text}"</p>
              <h3 className="text-xl font-semibold text-violet-700 dark:text-violet-300">
                {name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
