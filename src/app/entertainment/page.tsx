'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaMapMarkerAlt, FaFilter, FaSearch, FaStar, FaTicketAlt, FaTheaterMasks, FaGuitar, FaFilm, FaFutbol, FaMicrophoneAlt, FaRegCalendarAlt } from 'react-icons/fa';

// Mock data for entertainment events
const events = [
  {
    id: '1',
    title: 'Avengers: Final Chapter',
    type: 'Movie',
    image: '/event1.jpg',
    date: '2023-11-25',
    time: '19:00',
    venue: 'Cineplex Downtown',
    location: 'New York',
    price: '$15.99',
    rating: 4.8,
    tags: ['Action', 'Adventure', 'Sci-Fi'],
  },
  {
    id: '2',
    title: 'Hamilton: The Musical',
    type: 'Theater',
    image: '/event2.jpg',
    date: '2023-12-10',
    time: '20:00',
    venue: 'Broadway Theater',
    location: 'New York',
    price: '$89.99',
    rating: 4.9,
    tags: ['Musical', 'Historical', 'Drama'],
  },
  {
    id: '3',
    title: 'Taylor Swift: The Eras Tour',
    type: 'Concert',
    image: '/event3.jpg',
    date: '2023-12-15',
    time: '19:30',
    venue: 'Madison Square Garden',
    location: 'New York',
    price: '$120.00',
    rating: 4.9,
    tags: ['Pop', 'Live Music'],
  },
  {
    id: '4',
    title: 'NBA: Lakers vs. Warriors',
    type: 'Sports',
    image: '/event4.jpg',
    date: '2023-11-30',
    time: '18:00',
    venue: 'Staples Center',
    location: 'Los Angeles',
    price: '$75.00',
    rating: 4.7,
    tags: ['Basketball', 'Sports'],
  },
  {
    id: '5',
    title: 'Comedy Night with Dave Chappelle',
    type: 'Comedy',
    image: '/event5.jpg',
    date: '2023-12-05',
    time: '21:00',
    venue: 'The Comedy Store',
    location: 'Los Angeles',
    price: '$45.00',
    rating: 4.8,
    tags: ['Comedy', 'Stand-up'],
  },
  {
    id: '6',
    title: 'Coldplay World Tour',
    type: 'Concert',
    image: '/event6.jpg',
    date: '2023-12-20',
    time: '20:00',
    venue: 'MetLife Stadium',
    location: 'New Jersey',
    price: '$95.00',
    rating: 4.7,
    tags: ['Rock', 'Pop', 'Live Music'],
  },
];

// Entertainment categories with icons
const categories = [
  { name: 'Movies', icon: <FaFilm /> },
  { name: 'Theater', icon: <FaTheaterMasks /> },
  { name: 'Concerts', icon: <FaGuitar /> },
  { name: 'Sports', icon: <FaFutbol /> },
  { name: 'Comedy', icon: <FaMicrophoneAlt /> },
  { name: 'All Events', icon: <FaTicketAlt /> },
];

export default function EntertainmentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Events');
  const [filteredEvents, setFilteredEvents] = useState(events);

  // Filter events based on search query and active category
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    filterEvents(query, activeCategory);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    filterEvents(searchQuery, category);
  };

  const filterEvents = (query: string, category: string) => {
    let filtered = events;
    
    // Filter by search query
    if (query) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.venue.toLowerCase().includes(query.toLowerCase()) ||
        event.location.toLowerCase().includes(query.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }
    
    // Filter by category
    if (category !== 'All Events') {
      filtered = filtered.filter(event => event.type === category);
    }
    
    setFilteredEvents(filtered);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: { 
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Entertainment & Events</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover and book tickets for the best movies, shows, concerts, and sporting events in your area.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          className="mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Search events, venues, or locations..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              
              {/* Filter Button - For future expansion */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <FaFilter />
                <span>Filters</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Categories Section */}
        <motion.div 
          className="mb-10"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${
                  activeCategory === category.name
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-primary-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleCategoryChange(category.name)}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <span className="font-medium">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"
              >
                <div className="relative h-48 w-full">
                  <div className="absolute top-0 right-0 bg-primary-600 text-white text-sm font-bold py-1 px-3 rounded-bl-lg z-10">
                    {event.type}
                  </div>
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-amber-500">
                      <FaStar className="mr-1" />
                      <span className="text-sm font-medium">{event.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                    <FaMapMarkerAlt className="mr-2" />
                    <span className="text-sm">{event.venue}, {event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                    <FaCalendarAlt className="mr-2" />
                    <span className="text-sm">{event.date} • {event.time}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">{event.price}</span>
                    <Link href={`/entertainment/${event.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Book Now
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={fadeIn}
              className="col-span-full text-center py-12"
            >
              <div className="text-gray-500 dark:text-gray-400 text-lg">
                No events found. Try adjusting your search criteria.
              </div>
            </motion.div>
          )}
        </motion.div>
        
        {/* Coming Soon Events Section */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Coming Soon</h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-full md:w-64 h-36 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <FaRegCalendarAlt className="text-white text-4xl" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Subscribe for Early Access
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Get notified when new events are announced and secure early access to ticket sales for the most anticipated shows and concerts.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 