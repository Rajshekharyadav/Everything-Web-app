'use client';

import { motion } from 'framer-motion';
import AuthForm from '@/components/auth/AuthForm';
import { FaShieldAlt, FaUserPlus, FaLock } from 'react-icons/fa';

export default function SignUpPage() {
  const handleSignUp = async (data: { email: string; password: string; name?: string }) => {
    // TODO: Implement sign up logic
    console.log('Sign up data:', data);
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
            <AuthForm type="signup" onSubmit={handleSignUp} />
          </motion.div>

          {/* Right side - Benefits */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Join Everything Travel
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Create your account and start booking your travel with ease.
            </p>

            <div className="space-y-6">
              <motion.div
                className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <FaShieldAlt className="w-8 h-8 text-primary-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Secure Booking
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your data is protected with industry-standard security
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <FaUserPlus className="w-8 h-8 text-primary-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Easy Management
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Manage all your bookings in one place
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <FaLock className="w-8 h-8 text-primary-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Privacy First
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your information is kept private and secure
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