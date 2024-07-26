import React from "react";
import { motion } from "framer-motion";

const Jobnotfound = () => {
  return (
    <div className="flex-1 flex items-center justify-center mx-auto p-4 sm:p-6 lg:p-8">
      <motion.img
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        src="./notfound.jpg"
        alt="Job not found"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default Jobnotfound;
