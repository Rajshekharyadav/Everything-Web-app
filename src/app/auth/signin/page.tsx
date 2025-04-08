'use client';

import { motion } from 'framer-motion';
import AuthForm from '@/components/auth/AuthForm';
import { FaPlane, FaTrain, FaBus } from 'react-icons/fa';

export default function SignInPage() {
  const handleSignIn = async (data: { email: string; password: string }) => {
    // TODO: Implement sign in logic
    console.log('Sign in data:', data);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left side - Form */}
          <motion.div variants={itemVariants} className="w-full md:w-1/2">
            <AuthForm type="signin" onSubmit={handleSignIn} />
          </motion.div>

          {/* Right side - Features */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to Everything Travel
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Your one-stop solution for all travel needs. Book flights, trains, and buses with ease.
            </p>

            <div className="space-y-6">
              <motion.div
                className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <FaPlane className="w-8 h-8 text-primary-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Flights
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Book domestic and international flights
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <FaTrain className="w-8 h-8 text-primary-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Trains
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Reserve train tickets across all routes
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <FaBus className="w-8 h-8 text-primary-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Buses
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Book bus tickets for intercity travel
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 