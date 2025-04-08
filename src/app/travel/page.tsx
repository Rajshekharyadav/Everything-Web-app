'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaPlane, FaTrain, FaBus, FaHotel, FaUmbrellaBeach, FaMapMarkedAlt, 
  FaSearch, FaCalendarAlt, FaUsers, FaChevronRight, FaStar,
  FaMountain, FaCity, FaGlobeAmericas, FaBuilding, FaExchangeAlt,
  FaUser, FaSuitcase, FaFilter, FaSortAmountDown, FaClock, FaInfoCircle
} from 'react-icons/fa';
// @ts-ignore
import { motion, AnimatePresence } from 'framer-motion';

const travelServices = [
  {
    name: 'Flights',
    icon: <FaPlane className="w-8 h-8" />,
    description: 'Book domestic and international flights with the best deals',
    href: '/travel/flights',
    features: [
      'Best price guarantee',
      'Flexible booking options',
      '24/7 customer support',
      'Easy cancellation'
    ]
  },
  {
    name: 'Trains',
    icon: <FaTrain className="w-8 h-8" />,
    description: 'Book train tickets across all major routes',
    href: '/travel/trains',
    features: [
      'Instant confirmation',
      'Multiple payment options',
      'Seat selection',
      'PNR status tracking'
    ]
  },
  {
    name: 'Buses',
    icon: <FaBus className="w-8 h-8" />,
    description: 'Book bus tickets for intercity travel',
    href: '/travel/buses',
    features: [
      'Multiple operators',
      'Real-time tracking',
      'Comfortable seating',
      'On-time guarantee'
    ]
  },
  {
    name: 'Hotels',
    icon: <FaHotel className="w-8 h-8" />,
    description: 'Find the perfect accommodation for your stay',
    href: '/travel/hotels',
    features: [
      'Verified reviews',
      'Free cancellation',
      'Best rates',
      'Loyalty rewards'
    ]
  },
  {
    name: 'Vacation Packages',
    icon: <FaUmbrellaBeach className="w-8 h-8" />,
    description: 'All-inclusive vacation packages for the perfect getaway',
    href: '/travel/packages',
    features: [
      'Customizable packages',
      'Group discounts',
      'Travel insurance',
      'Expert guidance'
    ]
  },
  {
    name: 'Travel Guides',
    icon: <FaMapMarkedAlt className="w-8 h-8" />,
    description: 'Expert travel guides and local experiences',
    href: '/travel/guides',
    features: [
      'Local experts',
      'Custom itineraries',
      'Cultural experiences',
      'Off-the-beaten-path'
    ]
  }
];

const popularDestinations = [
  {
    name: 'Bali, Indonesia',
    icon: <FaUmbrellaBeach className="w-12 h-12" />,
    price: 'From $599',
    rating: 4.8,
    description: 'Tropical paradise with beautiful beaches and rich culture'
  },
  {
    name: 'Paris, France',
    icon: <FaCity className="w-12 h-12" />,
    price: 'From $799',
    rating: 4.9,
    description: 'The city of love with iconic landmarks and art'
  },
  {
    name: 'Tokyo, Japan',
    icon: <FaGlobeAmericas className="w-12 h-12" />,
    price: 'From $899',
    rating: 4.7,
    description: 'Modern metropolis with traditional charm'
  },
  {
    name: 'New York, USA',
    icon: <FaBuilding className="w-12 h-12" />,
    price: 'From $699',
    rating: 4.8,
    description: 'The city that never sleeps with endless attractions'
  }
];

interface FlightResult {
  id: number;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  duration: string;
  price: string;
  stops: string;
  class: string;
  seats: string;
  rating: number;
}

interface TrainResult {
  id: number;
  trainName: string;
  trainNumber: string;
  departure: string;
  arrival: string;
  duration: string;
  price: string;
  class: string;
  seats: string;
  rating: number;
}

interface BusResult {
  id: number;
  operator: string;
  busType: string;
  departure: string;
  arrival: string;
  duration: string;
  price: string;
  seats: string;
  rating: number;
}

interface MockResults {
  flights: FlightResult[];
  trains: TrainResult[];
  buses: BusResult[];
}

const mockResults: MockResults = {
  flights: [
    {
      id: 1,
      airline: 'Air India',
      flightNumber: 'AI-101',
      departure: '10:00 AM',
      arrival: '12:30 PM',
      duration: '2h 30m',
      price: '$299',
      stops: 'Non-stop',
      class: 'Economy',
      seats: '5 left',
      rating: 4.5
    },
    {
      id: 2,
      airline: 'IndiGo',
      flightNumber: '6E-456',
      departure: '02:15 PM',
      arrival: '04:45 PM',
      duration: '2h 30m',
      price: '$259',
      stops: 'Non-stop',
      class: 'Economy',
      seats: '12 left',
      rating: 4.2
    },
    {
      id: 3,
      airline: 'Vistara',
      flightNumber: 'UK-789',
      departure: '06:30 PM',
      arrival: '09:00 PM',
      duration: '2h 30m',
      price: '$349',
      stops: 'Non-stop',
      class: 'Premium Economy',
      seats: '8 left',
      rating: 4.7
    }
  ],
  trains: [
    {
      id: 1,
      trainName: 'Rajdhani Express',
      trainNumber: '12301',
      departure: '08:00 AM',
      arrival: '02:00 PM',
      duration: '6h',
      price: '$49',
      class: 'AC 2 Tier',
      seats: 'Available',
      rating: 4.3
    },
    {
      id: 2,
      trainName: 'Shatabdi Express',
      trainNumber: '12001',
      departure: '06:00 AM',
      arrival: '11:30 AM',
      duration: '5h 30m',
      price: '$39',
      class: 'AC Chair Car',
      seats: 'Available',
      rating: 4.1
    }
  ],
  buses: [
    {
      id: 1,
      operator: 'RedBus',
      busType: 'AC Sleeper',
      departure: '10:00 PM',
      arrival: '06:00 AM',
      duration: '8h',
      price: '$29',
      seats: '12 left',
      rating: 4.0
    },
    {
      id: 2,
      operator: 'Volvo',
      busType: 'AC Seater',
      departure: '11:00 PM',
      arrival: '07:00 AM',
      duration: '8h',
      price: '$25',
      seats: '15 left',
      rating: 4.2
    }
  ]
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function TravelPage() {
  const [activeTab, setActiveTab] = useState<'flights' | 'trains' | 'buses'>('flights');
  const [showResults, setShowResults] = useState(false);
  const [sortBy, setSortBy] = useState('price');
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    passengers: '1',
    class: 'economy',
    // Flight specific
    tripType: 'one-way',
    // Train specific
    quota: 'general',
    // Bus specific
    busType: 'sleeper',
  });

  const handleSearch = () => {
    setShowResults(true);
  };

  const handleBooking = async (result: any) => {
    try {
      const bookingData = {
        type: activeTab,
        from: searchParams.from,
        to: searchParams.to,
        date: searchParams.date,
        passengers: parseInt(searchParams.passengers),
        class: searchParams.class,
        price: parseFloat(result.price.replace('$', '')),
        status: 'pending',
        userId: 'user123', // Replace with actual user ID from auth
        ...(activeTab === 'flights' && {
          tripType: searchParams.tripType,
          airline: result.airline,
          flightNumber: result.flightNumber,
          departureTime: result.departure,
          arrivalTime: result.arrival,
          duration: result.duration,
          stops: result.stops
        }),
        ...(activeTab === 'trains' && {
          quota: searchParams.quota,
          trainName: result.trainName,
          trainNumber: result.trainNumber,
          departureTime: result.departure,
          arrivalTime: result.arrival,
          duration: result.duration
        }),
        ...(activeTab === 'buses' && {
          busType: searchParams.busType,
          operator: result.operator,
          departureTime: result.departure,
          arrivalTime: result.arrival,
          duration: result.duration
        })
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Booking created successfully!');
        // You can redirect to a booking confirmation page or show a success message
      } else {
        alert('Failed to create booking. Please try again.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const renderInputFields = () => {
    switch (activeTab) {
      case 'flights':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">From</label>
                <input
                  type="text"
                  placeholder="Enter departure city"
                  className="input"
                  value={searchParams.from}
                  onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
                />
              </div>
              <div>
                <label className="label">To</label>
                <input
                  type="text"
                  placeholder="Enter arrival city"
                  className="input"
                  value={searchParams.to}
                  onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="label">Date</label>
                <input
                  type="date"
                  className="input"
                  value={searchParams.date}
                  onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Passengers</label>
                <select
                  className="input"
                  value={searchParams.passengers}
                  onChange={(e) => setSearchParams({ ...searchParams, passengers: e.target.value })}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Class</label>
                <select
                  className="input"
                  value={searchParams.class}
                  onChange={(e) => setSearchParams({ ...searchParams, class: e.target.value })}
                >
                  <option value="economy">Economy</option>
                  <option value="premium-economy">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>
            </div>
            <div>
              <label className="label">Trip Type</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tripType"
                    value="one-way"
                    checked={searchParams.tripType === 'one-way'}
                    onChange={(e) => setSearchParams({ ...searchParams, tripType: e.target.value })}
                    className="mr-2"
                  />
                  One Way
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tripType"
                    value="round-trip"
                    checked={searchParams.tripType === 'round-trip'}
                    onChange={(e) => setSearchParams({ ...searchParams, tripType: e.target.value })}
                    className="mr-2"
                  />
                  Round Trip
                </label>
              </div>
            </div>
          </>
        );

      case 'trains':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">From Station</label>
                <input
                  type="text"
                  placeholder="Enter departure station"
                  className="input"
                  value={searchParams.from}
                  onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
                />
              </div>
              <div>
                <label className="label">To Station</label>
                <input
                  type="text"
                  placeholder="Enter arrival station"
                  className="input"
                  value={searchParams.to}
                  onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="label">Date</label>
                <input
                  type="date"
                  className="input"
                  value={searchParams.date}
                  onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Class</label>
                <select
                  className="input"
                  value={searchParams.class}
                  onChange={(e) => setSearchParams({ ...searchParams, class: e.target.value })}
                >
                  <option value="sleeper">Sleeper</option>
                  <option value="3a">3A</option>
                  <option value="2a">2A</option>
                  <option value="1a">1A</option>
                </select>
              </div>
              <div>
                <label className="label">Quota</label>
                <select
                  className="input"
                  value={searchParams.quota}
                  onChange={(e) => setSearchParams({ ...searchParams, quota: e.target.value })}
                >
                  <option value="general">General</option>
                  <option value="tatkal">Tatkal</option>
                  <option value="premium-tatkal">Premium Tatkal</option>
                </select>
              </div>
            </div>
          </>
        );

      case 'buses':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">From City</label>
                <input
                  type="text"
                  placeholder="Enter departure city"
                  className="input"
                  value={searchParams.from}
                  onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
                />
              </div>
              <div>
                <label className="label">To City</label>
                <input
                  type="text"
                  placeholder="Enter arrival city"
                  className="input"
                  value={searchParams.to}
                  onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="label">Date</label>
                <input
                  type="date"
                  className="input"
                  value={searchParams.date}
                  onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Bus Type</label>
                <select
                  className="input"
                  value={searchParams.busType}
                  onChange={(e) => setSearchParams({ ...searchParams, busType: e.target.value })}
                >
                  <option value="sleeper">Sleeper</option>
                  <option value="seater">Seater</option>
                  <option value="ac">AC</option>
                  <option value="non-ac">Non-AC</option>
                </select>
              </div>
              <div>
                <label className="label">Passengers</label>
                <select
                  className="input"
                  value={searchParams.passengers}
                  onChange={(e) => setSearchParams({ ...searchParams, passengers: e.target.value })}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const renderResults = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockResults[activeTab as keyof typeof mockResults].map((result) => (
          <motion.div
            key={result.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{result.airline}</h3>
                <p className="text-gray-600">{result.flightNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{result.price}</p>
                <p className="text-sm text-gray-500">{result.class}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-medium">{result.departure}</p>
                <p className="text-sm text-gray-500">{result.duration}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{result.arrival}</p>
                <p className="text-sm text-gray-500">{result.stops}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span>{result.rating}</span>
              </div>
              <button 
                onClick={() => handleBooking(result)}
                className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-semibold transition-colors"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Booking Form */}
      <section className="relative h-auto min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-90" />
        
        <motion.div 
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Book Your Journey
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Find the best deals for flights, trains, and buses
            </p>
          </div>

          {/* Booking Form */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-6">
              {['flights', 'trains', 'buses'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab as 'flights' | 'trains' | 'buses');
                    setShowResults(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    activeTab === tab
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Search Section */}
            <div className="space-y-4">
              {renderInputFields()}
            </div>

            {/* Search Button */}
            <div className="mt-6">
              <button 
                onClick={handleSearch}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Search {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Results Section */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Search Results</h2>
            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="price">Sort by Price</option>
                <option value="duration">Sort by Duration</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>

          {renderResults()}
        </motion.div>
      )}

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Travel Services</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need for your perfect trip
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {travelServices.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -8 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                <Link href={service.href} className="block p-6">
                  <div className="text-primary-600 dark:text-primary-400 mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <FaChevronRight className="w-3 h-3 mr-2 text-primary-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="text-primary-600 dark:text-primary-400 font-semibold flex items-center">
                    Learn More
                    <FaChevronRight className="ml-2" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Popular Destinations</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our most sought-after travel destinations
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {popularDestinations.map((destination, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.03 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="p-6">
                  <div className="text-primary-600 dark:text-primary-400 mb-4 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                    {destination.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {destination.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">
                      {destination.price}
                    </span>
                    <div className="flex items-center text-yellow-400">
                      <span className="mr-1">{destination.rating}</span>
                      <FaStar className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
} 