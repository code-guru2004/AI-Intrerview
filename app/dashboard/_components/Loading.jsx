// components/Loading.jsx
import React from 'react';
import { motion } from 'framer-motion'; // For smooth animations (optional)

const Loading = ({ isLoading }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const loadingCircleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      {isLoading && ( // Conditionally render the loading overlay
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" // Full-screen overlay
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden" // For when the overlay disappears
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center" // Loading circle container
            variants={loadingCircleVariants}
            animate="animate"
          >
            {/* You can replace this with an actual loading spinner component or image */}
            <div className="w-8 h-8 rounded-full bg-blue-500 animate-pulse"></div> {/* Example pulse animation */}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Loading;