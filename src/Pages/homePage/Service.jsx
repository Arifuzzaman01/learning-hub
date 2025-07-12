import React from "react";
import { motion } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaLaptopCode,
  FaBookReader,
  FaRegClock,
  FaUsers,
  FaCommentDots,
} from "react-icons/fa";

const services = [
  {
    icon: <FaChalkboardTeacher size={40} className="text-indigo-500" />,
    title: "Expert Tutors",
    description: "Learn from qualified educators with real-world expertise.",
  },
  {
    icon: <FaLaptopCode size={40} className="text-green-500" />,
    title: "Live Interactive Sessions",
    description: "Join live classes and collaborate with your peers in real-time.",
  },
  {
    icon: <FaBookReader size={40} className="text-blue-500" />,
    title: "Study Materials",
    description: "Get access to notes, docs, and resources anytime, anywhere.",
  },
  {
    icon: <FaRegClock size={40} className="text-yellow-500" />,
    title: "Flexible Scheduling",
    description: "Study at your own pace with our flexible session timings.",
  },
  {
    icon: <FaUsers size={40} className="text-purple-500" />,
    title: "Group Collaboration",
    description: "Work together in groups, share ideas, and grow together.",
  },
  {
    icon: <FaCommentDots size={40} className="text-pink-500" />,
    title: "Session Reviews",
    description: "Read and write reviews to ensure session quality and trust.",
  },
];

const Service = () => {
  return (
    <section className="pt-7 pb-14 bg-base-200">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          🌟 Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
