import { motion } from "framer-motion";
// import bannerImg from "/path/to/banner-image.png"; // or import from assets
import banner from "../../assets/study.jpg"
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12 px-4 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 max-w-7xl mx-auto">
        {/* Left Column */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 4,
          }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Collaborative <br /> Study Platform
          </h1>
          <p className="text-lg mb-6">
            Enhance collaboration between students and tutors with our platform
            — offering tools for scheduling, resource sharing, and user
            management.
          </p>
          <Link to='/dashboard' className="btn bg-white text-blue-800 hover:bg-gray-200">
            🚀 Get Started
          </Link>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, yoyo: Infinity }}
        >
          <img
            src={banner}
            alt="Study Banner"
            className="w-full max-h-[400px] object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
