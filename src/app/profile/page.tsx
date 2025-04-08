'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCog, FaHistory, FaHeart, FaCreditCard, FaSignOutAlt } from 'react-icons/fa';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, Country',
    profileImage: '/profile-placeholder.jpg',
  };

  // Mock booking history
  const bookings = [
    { id: '1', type: 'Flight', from: 'New York', to: 'London', date: '2023-05-15', status: 'Completed' },
    { id: '2', type: 'Hotel', name: 'Grand Hotel', location: 'Paris', checkIn: '2023-06-10', checkOut: '2023-06-15', status: 'Upcoming' },
    { id: '3', type: 'Train', from: 'Madrid', to: 'Barcelona', date: '2023-04-22', status: 'Completed' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const tabVariants = {
    inactive: { borderColor: 'transparent', color: '#6B7280' },
    active: { 
      borderColor: '#3B82F6', 
      color: '#1F2937',
      transition: { duration: 0.2 } 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Header */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary-300 dark:border-primary-700">
              <Image
                src={user.profileImage}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{user.name}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-primary-500" />
                  <span>{user.email}</span>
                </div>
                <div className="hidden sm:block text-gray-300 dark:text-gray-600">•</div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-primary-500" />
                  <span>{user.phone}</span>
                </div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 sm:mt-0 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Edit Profile
            </motion.button>
          </motion.div>
          
          {/* Tabs Navigation */}
          <motion.div variants={itemVariants} className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap -mb-px">
              <motion.button
                variants={tabVariants}
                animate={activeTab === 'profile' ? 'active' : 'inactive'}
                onClick={() => setActiveTab('profile')}
                className="mr-2 py-2 px-4 font-medium border-b-2 dark:text-gray-300"
              >
                Profile Details
              </motion.button>
              <motion.button
                variants={tabVariants}
                animate={activeTab === 'bookings' ? 'active' : 'inactive'}
                onClick={() => setActiveTab('bookings')}
                className="mr-2 py-2 px-4 font-medium border-b-2 dark:text-gray-300"
              >
                Booking History
              </motion.button>
              <motion.button
                variants={tabVariants}
                animate={activeTab === 'preferences' ? 'active' : 'inactive'}
                onClick={() => setActiveTab('preferences')}
                className="mr-2 py-2 px-4 font-medium border-b-2 dark:text-gray-300"
              >
                Preferences
              </motion.button>
            </div>
          </motion.div>
          
          {/* Content Area */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                    <p className="text-gray-900 dark:text-white font-medium">{user.name}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                    <p className="text-gray-900 dark:text-white font-medium">{user.email}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                    <p className="text-gray-900 dark:text-white font-medium">{user.phone}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                    <p className="text-gray-900 dark:text-white font-medium">{user.address}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Account Security</h2>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Password</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Last changed 30 days ago</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Change Password
                    </motion.button>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Two-factor Authentication</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Enable 2FA
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Booking History</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Details</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-medium text-gray-900 dark:text-white">{booking.type}</span>
                          </td>
                          <td className="px-6 py-4">
                            {booking.type === 'Flight' && (
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {booking.from} to {booking.to}
                              </div>
                            )}
                            {booking.type === 'Hotel' && (
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {booking.name}, {booking.location}
                              </div>
                            )}
                            {booking.type === 'Train' && (
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {booking.from} to {booking.to}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {booking.type === 'Hotel' ? 
                              `${booking.checkIn} to ${booking.checkOut}` : 
                              booking.date
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              booking.status === 'Completed' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Link href={`/bookings/${booking.id}`} className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300">
                              View Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Preferences</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive booking confirmations and updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">SMS Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive booking alerts via text message</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Marketing Communications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive offers and promotional material</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Travel Preferences</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Seat Type</label>
                      <select className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option>Window</option>
                        <option>Aisle</option>
                        <option>Middle</option>
                        <option>No Preference</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meal Preference</label>
                      <select className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option>Regular</option>
                        <option>Vegetarian</option>
                        <option>Vegan</option>
                        <option>Gluten-free</option>
                        <option>Low-calorie</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Currency</label>
                      <select className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option>USD - US Dollar</option>
                        <option>EUR - Euro</option>
                        <option>GBP - British Pound</option>
                        <option>JPY - Japanese Yen</option>
                        <option>INR - Indian Rupee</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Language</label>
                      <select className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Japanese</option>
                        <option>Chinese</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Save Preferences
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Quick Access Menu */}
          <motion.div 
            variants={itemVariants}
            className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Access</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <motion.a 
                href="/bookings" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <FaHistory className="w-6 h-6 text-primary-500 mb-2" />
                <span className="text-gray-900 dark:text-white text-sm">My Bookings</span>
              </motion.a>
              
              <motion.a 
                href="/favorites" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <FaHeart className="w-6 h-6 text-primary-500 mb-2" />
                <span className="text-gray-900 dark:text-white text-sm">Favorites</span>
              </motion.a>
              
              <motion.a 
                href="/payment-methods" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <FaCreditCard className="w-6 h-6 text-primary-500 mb-2" />
                <span className="text-gray-900 dark:text-white text-sm">Payment Methods</span>
              </motion.a>
              
              <motion.a 
                href="/auth/signin" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <FaSignOutAlt className="w-6 h-6 text-primary-500 mb-2" />
                <span className="text-gray-900 dark:text-white text-sm">Sign Out</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 