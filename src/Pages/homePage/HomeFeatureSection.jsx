import React from "react";
import featureImg from "../../assets/feature.jpg";
import { motion } from "framer-motion";

const HomeFeatureSection = () => {
  return (
    <section className="w-11/12 mx-auto py-10">
      <h2 className="text-4xl font-bold text-blue-600 text-center mb-8">
        🚀 Platform Features
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left Image with animation */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 3 , ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src={featureImg}
            alt="Study session features"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Right Feature List with animation */}
        <motion.div
          className="w-full md:w-1/2 space-y-6 text-base"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 3 , ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* 1. Study Session Management */}
          {/* <div>
            <h3 className="text-xl font-semibold mb-2">📚 Study Session Management</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Tutors can create, update, and manage study sessions.</li>
              <li>Admins can approve, reject, or modify submitted sessions.</li>
              <li>Students can browse and book available sessions.</li>
            </ul>
          </div> */}

          {/* 2. Stripe Payment */}
          <div>
            <h3 className="text-xl font-semibold mb-2">💳 Stripe Payment Integration</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Secure payment processing for paid sessions using Stripe.</li>
            </ul>
          </div>

          {/* 3. Notes System */}
          <div>
            <h3 className="text-xl font-semibold mb-2">📝 Notes System</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Students can create, edit, and manage their personal notes.</li>
            </ul>
          </div>

          {/* 4. Reviews & Ratings */}
          <div>
            <h3 className="text-xl font-semibold mb-2">⭐ Review & Rating</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Students can rate and review sessions.</li>
              <li>Average ratings shown on tutor profiles.</li>
            </ul>
          </div>

          {/* 5. Study Materials */}
          <div>
            <h3 className="text-xl font-semibold mb-2">📂 Study Materials Upload</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Tutors can upload resources (images, Google Drive links).
              </li>
              <li>
                Students can view and download materials. Admins can moderate content.
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeFeatureSection;
