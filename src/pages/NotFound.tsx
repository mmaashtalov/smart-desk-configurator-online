import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <motion.h1
          className="text-6xl font-bold mb-4 text-gray-800 dark:text-gray-200"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          404
        </motion.h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
          Oops! Page not found
        </p>
        <a
          href="/"
          className="text-blue-500 hover:text-blue-700 underline dark:text-blue-400 dark:hover:text-blue-600"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
