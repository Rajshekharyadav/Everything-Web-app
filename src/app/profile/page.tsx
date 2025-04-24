"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaCalendarAlt, FaMapMarkerAlt, FaCreditCard, FaHistory, FaSignOutAlt, FaEdit, FaCamera, FaLock, FaBell, FaBookmark } from "react-icons/fa";

// Mock user data - in a real app, this would come from auth context/API
const mockUser = {
  id: "user123",
  name: "Jane Smith",
  email: "jane.smith@example.com",
  avatar: "/profile-placeholder.jpg",
  joined: "January 2023",
  location: "New York, USA",
  bookings: [
    {
      id: "flight-123",
      type: "flight",
      title: "Flight to Paris",
      date: "2023-12-15",
      status: "upcoming"
    },
    {
      id: "hotel-456",
      type: "hotel",
      title: "Grand Hyatt Tokyo",
      date: "2023-12-25",
      status: "upcoming"
    },
    {
      id: "train-789",
      type: "train",
      title: "London to Edinburgh",
      date: "2023-11-20",
      status: "completed"
    }
  ],
  savedTrips: [
    {
      id: "trip-1",
      destination: "Bali, Indonesia",
      image: "/profile-placeholder.jpg"
    },
    {
      id: "trip-2",
      destination: "Swiss Alps",
      image: "/profile-placeholder.jpg"
    }
  ],
  preferences: {
    currency: "USD",
    language: "English",
    notifications: true
  }
};

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const router = useRouter();
  
  // Mock authentication check
  useEffect(() => {
    // In a real app, this would check auth state
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // For demo purposes, we'll set as not logged in to test redirection
      setIsLoggedIn(false);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  // Redirects to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/auth?mode=signin");
    }
  }, [isLoading, isLoggedIn, router]);
  
  // Handle sign out
  const handleSignOut = () => {
    // In a real app, this would clear auth tokens/state
    setIsLoggedIn(false);
    router.push("/auth?mode=signin");
  };
  
  // Handle edit profile
  const handleEditProfile = () => {
    setActiveTab("edit");
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin h-12 w-12 border-t-4 border-primary-500 border-solid rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left sidebar with profile summary and navigation */}
          <div className="md:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              {/* Profile header */}
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-primary-600 to-secondary-600"></div>
                <div className="absolute top-16 left-0 w-full flex justify-center">
                  <div className="relative h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-700">
                    <Image 
                      src={user.avatar} 
                      alt={user.name} 
                      layout="fill" 
                      objectFit="cover"
                    />
                    <button className="absolute bottom-0 right-0 bg-primary-500 p-2 rounded-full text-white">
                      <FaCamera size={14} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Profile info */}
              <div className="text-center pt-20 pb-6 px-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                <div className="flex justify-center space-x-4 mt-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <FaCalendarAlt className="mr-1" /> 
                    <span>Joined {user.joined}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <FaMapMarkerAlt className="mr-1" /> 
                    <span>{user.location}</span>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="border-t border-gray-200 dark:border-gray-700">
                <nav className="-mb-px">
                  <div className="space-y-1 py-4">
                    {[
                      { id: "profile", label: "My Profile", icon: <FaUser /> },
                      { id: "bookings", label: "My Bookings", icon: <FaHistory /> },
                      { id: "saved", label: "Saved Trips", icon: <FaBookmark /> },
                      { id: "payment", label: "Payment Methods", icon: <FaCreditCard /> },
                      { id: "security", label: "Security", icon: <FaLock /> },
                      { id: "notifications", label: "Notifications", icon: <FaBell /> },
                    ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center px-6 py-3 text-sm font-medium ${
                          activeTab === item.id 
                            ? "text-primary-600 bg-primary-50 dark:bg-primary-900/20 dark:text-primary-400 border-l-4 border-primary-600 dark:border-primary-400" 
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                        }`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </nav>
              </div>
              
              {/* Sign out button */}
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign out
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Right content area */}
          <div className="md:col-span-2">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              {/* Profile content */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
                    <button 
                      onClick={handleEditProfile}
                      className="flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Full name</h3>
                      <p className="mt-1 text-gray-900 dark:text-white">{user.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email address</h3>
                      <p className="mt-1 text-gray-900 dark:text-white">{user.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h3>
                      <p className="mt-1 text-gray-900 dark:text-white">{user.location}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Member since</h3>
                      <p className="mt-1 text-gray-900 dark:text-white">{user.joined}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Currency</h4>
                        <p className="mt-1 text-gray-900 dark:text-white">{user.preferences.currency}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Language</h4>
                        <p className="mt-1 text-gray-900 dark:text-white">{user.preferences.language}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Notifications</h4>
                        <p className="mt-1 text-gray-900 dark:text-white">{user.preferences.notifications ? "Enabled" : "Disabled"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Bookings content */}
              {activeTab === "bookings" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Bookings</h2>
                    <Link 
                      href="/travel"
                      className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
                    >
                      Book New Trip
                    </Link>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Upcoming Trips</h3>
                    <div className="space-y-4">
                      {user.bookings.filter(b => b.status === "upcoming").map(booking => (
                        <div 
                          key={booking.id}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">{booking.title}</h4>
                              <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <FaCalendarAlt className="mr-1" />
                                <span>{new Date(booking.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                              </div>
                            </div>
                            <Link 
                              href={`/booking/${booking.id}`}
                              className="px-3 py-1 text-xs text-primary-600 dark:text-primary-400 border border-primary-600 dark:border-primary-400 rounded-full"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-8">Past Trips</h3>
                    <div className="space-y-4">
                      {user.bookings.filter(b => b.status === "completed").map(booking => (
                        <div 
                          key={booking.id}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">{booking.title}</h4>
                              <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <FaCalendarAlt className="mr-1" />
                                <span>{new Date(booking.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                              </div>
                            </div>
                            <Link 
                              href={`/booking/${booking.id}`}
                              className="px-3 py-1 text-xs text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-full"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Saved Trips content */}
              {activeTab === "saved" && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Saved Trips</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Your bookmarked destinations and itineraries</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {user.savedTrips.map(trip => (
                      <div 
                        key={trip.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="relative h-48">
                          <Image 
                            src={trip.image} 
                            alt={trip.destination} 
                            layout="fill" 
                            objectFit="cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-gray-900 dark:text-white">{trip.destination}</h3>
                          <div className="mt-4 flex justify-between">
                            <Link 
                              href={`/travel?destination=${encodeURIComponent(trip.destination)}`}
                              className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
                            >
                              Plan Trip
                            </Link>
                            <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Other tabs would be implemented similarly */}
              {activeTab !== "profile" && activeTab !== "bookings" && activeTab !== "saved" && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    This section is under development. Check back soon!
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 