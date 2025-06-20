'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaPlane, FaTrain, FaBus, FaHotel, FaUmbrellaBeach, FaMapMarkedAlt, 
  FaSearch, FaCalendarAlt, FaUsers, FaChevronRight, FaStar,
  FaMountain, FaCity, FaGlobeAmericas, FaBuilding, FaExchangeAlt,
  FaUser, FaSuitcase, FaFilter, FaSortAmountDown, FaClock, FaInfoCircle,
  FaMapMarkerAlt, FaRegClock, FaMoneyBillWave, FaShieldAlt, FaWifi, 
  FaCoffee, FaParking, FaWheelchair, FaBabyCarriage, FaDog, 
  FaArrowRight, FaTimes, FaThumbsUp, FaChild, FaBed, FaUtensils, FaSwimmingPool, FaDumbbell, FaCar, FaCheck
} from 'react-icons/fa';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Enhanced travel services with more details
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
    ],
    color: 'from-blue-500 to-indigo-600',
    image: '/profile-placeholder.jpg'
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
    ],
    color: 'from-green-500 to-teal-600',
    image: '/profile-placeholder.jpg'
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
    ],
    color: 'from-yellow-500 to-amber-600',
    image: '/profile-placeholder.jpg'
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
    ],
    color: 'from-purple-500 to-pink-600',
    image: '/profile-placeholder.jpg'
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
    ],
    color: 'from-red-500 to-rose-600',
    image: '/profile-placeholder.jpg'
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
    ],
    color: 'from-cyan-500 to-blue-600',
    image: '/profile-placeholder.jpg'
  }
];

// Enhanced popular destinations with additional details
const popularDestinations = [
  {
    name: 'Bali, Indonesia',
    image: '/profile-placeholder.jpg',
    description: 'Tropical paradise with beautiful beaches and rich culture',
    price: 'From $599',
    rating: 4.8,
    attractions: ['Beaches', 'Temples', 'Rice terraces', 'Waterfalls'],
    bestTimeToVisit: 'April to October',
    flightDuration: '~15 hours'
  },
  {
    name: 'Paris, France',
    image: '/profile-placeholder.jpg',
    description: 'The city of love with iconic landmarks and art',
    price: 'From $799',
    rating: 4.9,
    attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre Dame', 'Arc de Triomphe'],
    bestTimeToVisit: 'April to June, September to October',
    flightDuration: '~8 hours'
  },
  {
    name: 'Tokyo, Japan',
    image: '/profile-placeholder.jpg',
    description: 'Modern metropolis with traditional charm',
    price: 'From $899',
    rating: 4.7,
    attractions: ['Mt. Fuji', 'Tokyo Tower', 'Imperial Palace', 'Shibuya Crossing'],
    bestTimeToVisit: 'March to May, September to November',
    flightDuration: '~14 hours'
  },
  {
    name: 'New York, USA',
    image: '/profile-placeholder.jpg',
    description: 'The city that never sleeps with endless attractions',
    price: 'From $699',
    rating: 4.8,
    attractions: ['Times Square', 'Central Park', 'Statue of Liberty', 'Broadway'],
    bestTimeToVisit: 'April to June, September to November',
    flightDuration: '~8 hours'
  }
];

// Travel tips
const travelTips = [
  {
    title: 'Book in Advance',
    description: 'Book your flights at least 3-4 months in advance for the best deals and availability.',
    icon: <FaCalendarAlt className="w-6 h-6" />
  },
  {
    title: 'Travel Insurance',
    description: 'Always purchase travel insurance for international trips to protect against cancellations and emergencies.',
    icon: <FaShieldAlt className="w-6 h-6" />
  },
  {
    title: 'Pack Light',
    description: 'Pack only essentials to avoid excess baggage fees and make travel more convenient.',
    icon: <FaSuitcase className="w-6 h-6" />
  },
  {
    title: 'Local Currency',
    description: 'Exchange some money to local currency before your trip for immediate expenses upon arrival.',
    icon: <FaMoneyBillWave className="w-6 h-6" />
  }
];

// Enhanced travel experiences with testimonials
const travelExperiences = [
  {
    name: 'Sarah Johnson',
    location: 'Bali Retreat',
    testimonial: 'The Bali vacation package was incredible! Everything was perfectly organized, from the beachfront hotel to the temple tours. Will definitely book again.',
    rating: 5,
    image: '/profile-placeholder.jpg'
  },
  {
    name: 'Michael Chen',
    location: 'European Adventure',
    testimonial: 'Booked a multi-city European tour through this platform and had the most amazing experience. The train connections were seamless and hotels were in perfect locations.',
    rating: 5,
    image: '/profile-placeholder.jpg'
  },
  {
    name: 'Emily Rodriguez',
    location: 'Japan Explorer',
    testimonial: 'Our family trip to Japan was unforgettable. The customized itinerary helped us experience both traditional culture and modern attractions with ease.',
    rating: 4.8,
    image: '/profile-placeholder.jpg'
  }
];

// Additional interfaces for enhanced flight results
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
  amenities?: string[];
  baggage?: string;
  cancellationPolicy?: string;
  logo?: string;
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
  amenities?: string[];
  platform?: string;
  distanceCovered?: string;
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
  amenities?: string[];
  boardingPoints?: string[];
  droppingPoints?: string[];
}

interface HotelResult {
  id: number;
  name: string;
  location: string;
  price: string;
  rating: number;
  amenities: string[];
  roomType: string;
  availableRooms: number;
  image: string;
  cancellationPolicy: string;
}

interface MockResults {
  flights: FlightResult[];
  trains: TrainResult[];
  buses: BusResult[];
  hotels: HotelResult[];
}

// Enhanced mock results with more details
const mockResults: MockResults = {
  flights: [
    {
      id: 1,
      airline: 'Air India',
      flightNumber: 'AI-101',
      departure: '10:00 AM',
      arrival: '12:30 PM',
      duration: '2h 30m',
      price: '₹21,999',
      stops: 'Non-stop',
      class: 'Economy',
      seats: '5 left',
      rating: 4.5,
      amenities: ['Wi-Fi', 'In-flight meals', 'Entertainment', 'USB charging'],
      baggage: '1 × 23kg check-in, 1 × 7kg cabin',
      cancellationPolicy: 'Refundable (Fee applies)',
      logo: '/profile-placeholder.jpg'
    },
    {
      id: 2,
      airline: 'IndiGo',
      flightNumber: '6E-456',
      departure: '02:15 PM',
      arrival: '04:45 PM',
      duration: '2h 30m',
      price: '₹18,999',
      stops: 'Non-stop',
      class: 'Economy',
      seats: '12 left',
      rating: 4.2,
      amenities: ['Snacks for purchase', 'Extra legroom seats available', 'Priority boarding option'],
      baggage: '1 × 15kg check-in, 1 × 7kg cabin',
      cancellationPolicy: 'Non-refundable',
      logo: '/profile-placeholder.jpg'
    },
    {
      id: 3,
      airline: 'Vistara',
      flightNumber: 'UK-789',
      departure: '06:30 PM',
      arrival: '09:00 PM',
      duration: '2h 30m',
      price: '₹25,999',
      stops: 'Non-stop',
      class: 'Premium Economy',
      seats: '8 left',
      rating: 4.7,
      amenities: ['Wi-Fi', 'Premium meals', 'Entertainment', 'Power outlets', 'Priority check-in'],
      baggage: '1 × 30kg check-in, 1 × 10kg cabin',
      cancellationPolicy: 'Fully refundable',
      logo: '/profile-placeholder.jpg'
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
      price: '₹3,499',
      class: 'AC 2 Tier',
      seats: 'Available',
      rating: 4.3,
      amenities: ['Catering service', 'Bedding provided', 'Charging ports'],
      platform: 'Platform 5',
      distanceCovered: '450 km'
    },
    {
      id: 2,
      trainName: 'Shatabdi Express',
      trainNumber: '12001',
      departure: '06:00 AM',
      arrival: '11:30 AM',
      duration: '5h 30m',
      price: '₹2,999',
      class: 'AC Chair Car',
      seats: 'Available',
      rating: 4.1,
      amenities: ['Breakfast & lunch included', 'Newspaper', 'Charging ports'],
      platform: 'Platform 3',
      distanceCovered: '380 km'
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
      price: '₹1,999',
      seats: '12 left',
      rating: 4.0,
      amenities: ['Blanket', 'Charging point', 'Water bottle', 'Emergency exit'],
      boardingPoints: ['Central Bus Stand', 'City Mall', 'Airport'],
      droppingPoints: ['Downtown', 'Railway Station', 'Market Area']
    },
    {
      id: 2,
      operator: 'Volvo',
      busType: 'AC Seater',
      departure: '11:00 PM',
      arrival: '07:00 AM',
      duration: '8h',
      price: '₹1,799',
      seats: '15 left',
      rating: 4.2,
      amenities: ['Recliner seats', 'Television', 'Charging point', 'Wi-Fi'],
      boardingPoints: ['Main Bus Terminal', 'Highway Junction', 'College Road'],
      droppingPoints: ['Central Square', 'City Center', 'Bus Terminal']
    }
  ],
  hotels: [
    {
      id: 1,
      name: 'Grand Plaza Hotel',
      location: 'Downtown',
      price: '₹8,999/night',
      rating: 4.6,
      amenities: ['Free Wi-Fi', 'Swimming pool', 'Gym', 'Restaurant', 'Spa'],
      roomType: 'Deluxe Double Room',
      availableRooms: 5,
      image: '/profile-placeholder.jpg',
      cancellationPolicy: 'Free cancellation up to 24 hours before check-in'
    },
    {
      id: 2,
      name: 'Seaside Resort',
      location: 'Beachfront',
      price: '₹13,499/night',
      rating: 4.8,
      amenities: ['Free Wi-Fi', 'Private beach', 'Infinity pool', 'Multiple restaurants', 'Water sports'],
      roomType: 'Ocean View Suite',
      availableRooms: 3,
      image: '/profile-placeholder.jpg',
      cancellationPolicy: 'Free cancellation up to 48 hours before check-in'
    },
    {
      id: 3,
      name: 'City Comfort Inn',
      location: 'Business District',
      price: '₹6,499/night',
      rating: 4.2,
      amenities: ['Free Wi-Fi', 'Business center', 'Continental breakfast', 'Parking'],
      roomType: 'Standard Queen Room',
      availableRooms: 10,
      image: '/profile-placeholder.jpg',
      cancellationPolicy: 'Non-refundable'
    }
  ]
};

// Animation variants
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

const pulseAnimation = {
  scale: [1, 1.02, 1],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Add Indian cities and states data
const indianCities = [
  'Mumbai, Maharashtra',
  'Delhi, Delhi',
  'Bangalore, Karnataka',
  'Hyderabad, Telangana',
  'Chennai, Tamil Nadu',
  'Kolkata, West Bengal',
  'Pune, Maharashtra',
  'Ahmedabad, Gujarat',
  'Jaipur, Rajasthan',
  'Lucknow, Uttar Pradesh',
  'Kochi, Kerala',
  'Chandigarh, Punjab',
  'Goa, Goa',
  'Indore, Madhya Pradesh',
  'Bhubaneswar, Odisha',
  'Amritsar, Punjab',
  'Varanasi, Uttar Pradesh',
  'Agra, Uttar Pradesh',
  'Shimla, Himachal Pradesh',
  'Srinagar, Jammu & Kashmir',
  'Darjeeling, West Bengal'
];

export default function TravelPage() {
  // Enhanced state with more options
  const [activeTab, setActiveTab] = useState<'flights' | 'trains' | 'buses' | 'hotels'>('flights');
  const [showResults, setShowResults] = useState(false);
  const [sortBy, setSortBy] = useState('price');
  const [filterOptions, setFilterOptions] = useState({
    priceRange: [0, 25000],
    directOnly: false,
    refundableOnly: false,
    rating: 0
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showDetailedView, setShowDetailedView] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    returnDate: '',
    passengers: '1',
    class: 'economy',
    // Flight specific
    tripType: 'one-way',
    // Train specific
    quota: 'general',
    // Bus specific
    busType: 'sleeper',
    // Hotel specific
    rooms: '1',
    guests: '2',
    checkIn: '',
    checkOut: ''
  });
  
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView();
  
  // Trigger animations when section is in view
  useEffect(() => {
    if (inView) {
      controls.start('animate');
    }
  }, [controls, inView]);
  
  // Handle date change to set minimun return date for round trips
  useEffect(() => {
    if (searchParams.date && searchParams.tripType === 'round-trip' && (!searchParams.returnDate || new Date(searchParams.returnDate) < new Date(searchParams.date))) {
      setSearchParams(prev => ({
        ...prev,
        returnDate: searchParams.date
      }));
    }
  }, [searchParams.date, searchParams.tripType]);

  const handleSearch = () => {
    // Validate inputs before showing results
    if (!searchParams.from || !searchParams.to || !searchParams.date) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (searchParams.tripType === 'round-trip' && !searchParams.returnDate) {
      alert('Please select a return date for round trip');
      return;
    }
    
    // Add animation before showing results
    controls.start({
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 }
    }).then(() => {
      setShowResults(true);
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
      });
    });
  };

  const handleBooking = async (result: any) => {
    try {
      // Determine booking ID based on type
      let bookingId;
      
      switch (activeTab) {
        case 'flights':
          bookingId = `flight-${result.id}`;
          break;
        case 'trains':
          bookingId = `train-${result.id}`;
          break;
        case 'buses':
          bookingId = `bus-${result.id}`;
          break;
        case 'hotels':
          bookingId = `hotel-${result.id}`;
          break;
        default:
          bookingId = `unknown-${result.id}`;
      }
      
      // Alert user about the booking (in a real app, this would be a toast or modal)
      alert("Booking initiated! Redirecting to payment page...");
      
      // Redirect to booking redirect page with ID
      setTimeout(() => {
        window.location.href = `/travel/booking?id=${bookingId}`;
      }, 1000);
    } catch (error) {
      console.error('Error in booking process:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const renderInputFields = () => {
    const customInput = "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200";
    
    // Helper component for location input with suggestions
    const LocationInput = ({ 
      value,
      onChange,
      placeholder,
      label,
      fieldName,
      hasSwapButton = false
    }: {
      value: string,
      onChange: (value: string) => void,
      placeholder: string,
      label: string,
      fieldName: 'from' | 'to',
      hasSwapButton?: boolean
    }) => {
      const [isFocused, setIsFocused] = useState(false);
      const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
      const inputRef = useRef<HTMLInputElement>(null);
      const dropdownRef = useRef<HTMLDivElement>(null);
      
      // Filter suggestions based on input
      useEffect(() => {
        if (value.trim() === '') {
          setFilteredSuggestions(indianCities.slice(0, 5));
        } else {
          const filtered = indianCities.filter(city => 
            city.toLowerCase().includes(value.toLowerCase())
          ).slice(0, 5);
          setFilteredSuggestions(filtered);
        }
      }, [value]);

      // Handle outside click to close dropdown
      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            dropdownRef.current && 
            !dropdownRef.current.contains(event.target as Node) &&
            inputRef.current && 
            !inputRef.current.contains(event.target as Node)
          ) {
            setIsFocused(false);
          }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
      
      // Handle selection of a popular city
      const handlePopularCityClick = (city: string) => {
        onChange(city);
        // Force focus to input after selection
        if (inputRef.current) {
          inputRef.current.focus();
          // Close dropdown after selection with slight delay
          setTimeout(() => setIsFocused(false), 100);
        }
      };
      
      return (
        <div className="relative group">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{label}</label>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary-500 transition-colors duration-200" />
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              className={`${customInput} pl-10 ${hasSwapButton ? 'pr-12' : ''} hover:border-primary-300 focus:shadow-md`}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              // Don't use onBlur to prevent immediate dropdown closing
              onClick={() => setIsFocused(true)} // Add click handler to ensure dropdown opens
              required
              aria-expanded={isFocused}
              aria-controls={`suggestions-${fieldName}`}
            />
            
            {/* Suggestions dropdown */}
            {isFocused && (
              <div 
                ref={dropdownRef}
                id={`suggestions-${fieldName}`}
                className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto"
              >
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                      onClick={() => {
                        onChange(suggestion);
                        // Don't close the dropdown immediately to avoid flicker
                        setTimeout(() => setIsFocused(false), 100);
                      }}
                    >
                      <FaMapMarkerAlt className="mr-2 text-primary-500" />
                      <div>
                        <div className="font-medium">{suggestion.split(',')[0]}</div>
                        <div className="text-xs text-gray-500">{suggestion.split(',')[1]}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500 italic">No matching cities found</div>
                )}
              </div>
            )}
          </div>
          {fieldName === 'from' ? (
            <p className="text-xs text-gray-500 mt-1">
              Popular: 
              <span 
                className="text-primary-600 hover:underline cursor-pointer ml-1 mr-1"
                onClick={() => handlePopularCityClick('Mumbai, Maharashtra')}
              >
                Mumbai
              </span>, 
              <span 
                className="text-primary-600 hover:underline cursor-pointer mr-1"
                onClick={() => handlePopularCityClick('Delhi, Delhi')}
              >
                Delhi
              </span>, 
              <span 
                className="text-primary-600 hover:underline cursor-pointer"
                onClick={() => handlePopularCityClick('Bangalore, Karnataka')}
              >
                Bangalore
              </span>
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">
              Popular: 
              <span 
                className="text-primary-600 hover:underline cursor-pointer ml-1 mr-1"
                onClick={() => handlePopularCityClick('Chennai, Tamil Nadu')}
              >
                Chennai
              </span>, 
              <span 
                className="text-primary-600 hover:underline cursor-pointer mr-1"
                onClick={() => handlePopularCityClick('Kolkata, West Bengal')}
              >
                Kolkata
              </span>, 
              <span 
                className="text-primary-600 hover:underline cursor-pointer"
                onClick={() => handlePopularCityClick('Jaipur, Rajasthan')}
              >
                Jaipur
              </span>
            </p>
          )}
        </div>
      );
    };
    
    switch (activeTab) {
      case 'flights':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <LocationInput
                value={searchParams.from}
                onChange={(value) => setSearchParams({ ...searchParams, from: value })}
                placeholder="Enter departure city"
                label="From"
                fieldName="from"
                hasSwapButton={true}
              />
              
              <LocationInput
                value={searchParams.to}
                onChange={(value) => setSearchParams({ ...searchParams, to: value })}
                placeholder="Enter arrival city"
                label="To"
                fieldName="to"
                hasSwapButton={true}
              />
              
              {/* Move the swap button outside of the inputs but make it absolute positioned */}
              <motion.button 
                type="button" 
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/4 z-10 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 bg-gray-100 dark:bg-gray-700 p-3 rounded-full shadow-md hover:shadow-lg"
                onClick={() => {
                  // Improved swap functionality
                  const tempFrom = searchParams.from;
                  const tempTo = searchParams.to;
                  setSearchParams({ 
                    ...searchParams, 
                    from: tempTo, 
                    to: tempFrom 
                  });
                }}
                title="Swap destinations"
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <FaExchangeAlt />
              </motion.button>
            </div>
            
            {/* Rest of flights form remains unchanged */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Departure Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary-500 transition-colors duration-200" />
                  <input
                    type="date"
                    className={`${customInput} pl-10 hover:border-primary-300 focus:shadow-md`}
                    value={searchParams.date}
                    onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              
              {searchParams.tripType === 'round-trip' && (
                <div className="group">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Return Date</label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary-500 transition-colors duration-200" />
                    <input
                      type="date"
                      className={`${customInput} pl-10 hover:border-primary-300 focus:shadow-md`}
                      value={searchParams.returnDate}
                      onChange={(e) => setSearchParams({ ...searchParams, returnDate: e.target.value })}
                      min={searchParams.date || new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Rest of flights form unchanged */}
              <div className="group">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Passengers</label>
                <div className="relative">
                  <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary-500 transition-colors duration-200" />
                  <select
                    className={`${customInput} pl-10 hover:border-primary-300 focus:shadow-md appearance-none`}
                    value={searchParams.passengers}
                    onChange={(e) => setSearchParams({ ...searchParams, passengers: e.target.value })}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                    <FaChevronRight className="transform rotate-90 w-4 h-4" />
                  </div>
                </div>
              </div>
              
              <div className="group">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Class</label>
                <div className="relative">
                  <FaSuitcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary-500 transition-colors duration-200" />
                  <select
                    className={`${customInput} pl-10 hover:border-primary-300 focus:shadow-md appearance-none`}
                    value={searchParams.class}
                    onChange={(e) => setSearchParams({ ...searchParams, class: e.target.value })}
                  >
                    <option value="economy">Economy</option>
                    <option value="premium-economy">Premium Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                    <FaChevronRight className="transform rotate-90 w-4 h-4" />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Trip Type</label>
                <div className="flex gap-4 mt-2 bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-300 dark:border-gray-700">
                  <label className="flex items-center flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      value="one-way"
                      checked={searchParams.tripType === 'one-way'}
                      onChange={(e) => setSearchParams({ ...searchParams, tripType: e.target.value })}
                      className="mr-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm">One Way</span>
                  </label>
                  <label className="flex items-center flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      value="round-trip"
                      checked={searchParams.tripType === 'round-trip'}
                      onChange={(e) => setSearchParams({ ...searchParams, tripType: e.target.value })}
                      className="mr-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm">Round Trip</span>
                  </label>
                </div>
              </div>
            </div>
          </>
        );

      case 'trains':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <LocationInput
                value={searchParams.from}
                onChange={(value) => setSearchParams({ ...searchParams, from: value })}
                placeholder="Enter departure station"
                label="From Station"
                fieldName="from"
                hasSwapButton={true}
              />
              
              <LocationInput
                value={searchParams.to}
                onChange={(value) => setSearchParams({ ...searchParams, to: value })}
                placeholder="Enter arrival station"
                label="To Station"
                fieldName="to"
                hasSwapButton={true}
              />
              
              {/* Move the swap button outside of the inputs but make it absolute positioned */}
              <motion.button 
                type="button" 
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/4 z-10 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 bg-gray-100 dark:bg-gray-700 p-3 rounded-full shadow-md hover:shadow-lg"
                onClick={() => {
                  // Improved swap functionality
                  const tempFrom = searchParams.from;
                  const tempTo = searchParams.to;
                  setSearchParams({ 
                    ...searchParams, 
                    from: tempTo, 
                    to: tempFrom 
                  });
                }}
                title="Swap stations"
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <FaExchangeAlt />
              </motion.button>
            </div>
            
            {/* Rest of trains form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary-500 transition-colors duration-200" />
                  <input
                    type="date"
                    className={`${customInput} pl-10 hover:border-primary-300 focus:shadow-md`}
                    value={searchParams.date}
                    onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              
              <div className="group">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Class</label>
                <div className="relative">
                  <FaSuitcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary-500 transition-colors duration-200" />
                  <select
                    className={`${customInput} pl-10 hover:border-primary-300 focus:shadow-md appearance-none`}
                    value={searchParams.class}
                    onChange={(e) => setSearchParams({ ...searchParams, class: e.target.value })}
                  >
                    <option value="sleeper">Sleeper</option>
                    <option value="3a">AC 3 Tier</option>
                    <option value="2a">AC 2 Tier</option>
                    <option value="1a">AC First Class</option>
                    <option value="cc">Chair Car</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                    <FaChevronRight className="transform rotate-90 w-4 h-4" />
                  </div>
                </div>
              </div>
              
              <div className="group">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Quota</label>
                <div className="relative">
                  <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary-500 transition-colors duration-200" />
                  <select
                    className={`${customInput} pl-10 hover:border-primary-300 focus:shadow-md appearance-none`}
                    value={searchParams.quota}
                    onChange={(e) => setSearchParams({ ...searchParams, quota: e.target.value })}
                  >
                    <option value="general">General</option>
                    <option value="tatkal">Tatkal</option>
                    <option value="premium-tatkal">Premium Tatkal</option>
                    <option value="ladies">Ladies</option>
                    <option value="senior-citizen">Senior Citizen</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                    <FaChevronRight className="transform rotate-90 w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Passengers</label>
                <div className="relative">
                  <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary-500 transition-colors duration-200" />
                  <select
                    className={`${customInput} pl-10 hover:border-primary-300 focus:shadow-md appearance-none`}
                    value={searchParams.passengers}
                    onChange={(e) => setSearchParams({ ...searchParams, passengers: e.target.value })}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                    <FaChevronRight className="transform rotate-90 w-4 h-4" />
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mt-6">
                  <div className="flex items-center">
                    <FaInfoCircle className="text-primary-500 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Bookings open 120 days in advance for most trains
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 'buses':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <LocationInput
                value={searchParams.from}
                onChange={(value) => setSearchParams({ ...searchParams, from: value })}
                placeholder="Enter departure city"
                label="From City"
                fieldName="from"
                hasSwapButton={true}
              />
              
              <LocationInput
                value={searchParams.to}
                onChange={(value) => setSearchParams({ ...searchParams, to: value })}
                placeholder="Enter arrival city"
                label="To City"
                fieldName="to"
                hasSwapButton={true}
              />
              
              {/* Move the swap button outside of the inputs but make it absolute positioned */}
              <motion.button 
                type="button" 
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/4 z-10 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 bg-gray-100 dark:bg-gray-700 p-3 rounded-full shadow-md hover:shadow-lg"
                onClick={() => {
                  // Improved swap functionality
                  const tempFrom = searchParams.from;
                  const tempTo = searchParams.to;
                  setSearchParams({ 
                    ...searchParams, 
                    from: tempTo, 
                    to: tempFrom 
                  });
                }}
                title="Swap cities"
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <FaExchangeAlt />
              </motion.button>
            </div>
            
            {/* Rest of buses form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Date of Journey</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary-500 transition-colors duration-200" />
                  <input
                    type="date"
                    className={`${customInput} pl-10 hover:border-primary-300 focus:shadow-md`}
                    value={searchParams.date}
                    onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              
              <div className="group">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Bus Type</label>
                <div className="relative">
                  <FaBus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary-500 transition-colors duration-200" />
                  <select
                    className={`${customInput} pl-10 hover:border-primary-300 focus:shadow-md appearance-none`}
                    value={searchParams.busType}
                    onChange={(e) => setSearchParams({ ...searchParams, busType: e.target.value })}
                  >
                    <option value="all">All Types</option>
                    <option value="sleeper">Sleeper</option>
                    <option value="seater">Seater</option>
                    <option value="ac">AC</option>
                    <option value="non-ac">Non-AC</option>
                    <option value="volvo">Volvo</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                    <FaChevronRight className="transform rotate-90 w-4 h-4" />
                  </div>
                </div>
              </div>
              
              <div className="group">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Passengers</label>
                <div className="relative">
                  <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary-500 transition-colors duration-200" />
                  <select
                    className={`${customInput} pl-10 hover:border-primary-300 focus:shadow-md appearance-none`}
                    value={searchParams.passengers}
                    onChange={(e) => setSearchParams({ ...searchParams, passengers: e.target.value })}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                    <FaChevronRight className="transform rotate-90 w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4 border-l-4 border-blue-500">
              <div className="flex">
                <FaInfoCircle className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">Travel Tip</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Overnight buses typically depart between 8PM-11PM and arrive early morning. Book early for best seat selection!
                  </p>
                </div>
              </div>
            </div>
          </>
        );

      case 'hotels':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <LocationInput
                value={searchParams.to}
                onChange={(value) => setSearchParams({ ...searchParams, to: value })}
                placeholder="Enter city or hotel name"
                label="Destination/Hotel Name"
                fieldName="to"
                hasSwapButton={true}
              />
              
              {/* Move the swap button outside of the inputs but make it absolute positioned */}
              <motion.button 
                type="button" 
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/4 z-10 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 bg-gray-100 dark:bg-gray-700 p-3 rounded-full shadow-md hover:shadow-lg"
                onClick={() => {
                  // Improved swap functionality
                  const tempFrom = searchParams.from;
                  const tempTo = searchParams.to;
                  setSearchParams({ 
                    ...searchParams, 
                    from: tempTo, 
                    to: tempFrom 
                  });
                }}
                title="Swap destinations"
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <FaExchangeAlt />
              </motion.button>
            </div>
            
            {/* Rest of hotels form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Check-in Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary-500 transition-colors duration-200" />
                  <input
                    type="date"
                    className={`${customInput} pl-10 hover:border-primary-300 focus:shadow-md`}
                    value={searchParams.checkIn || searchParams.date}
                    onChange={(e) => setSearchParams({ 
                      ...searchParams, 
                      checkIn: e.target.value,
                      date: e.target.value // Keep date in sync for consistency
                    })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              
              <div className="group">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Check-out Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary-500 transition-colors duration-200" />
                  <input
                    type="date"
                    className={`${customInput} pl-10 hover:border-primary-300 focus:shadow-md`}
                    value={searchParams.checkOut || searchParams.returnDate}
                    onChange={(e) => setSearchParams({ 
                      ...searchParams, 
                      checkOut: e.target.value,
                      returnDate: e.target.value // Keep returnDate in sync for consistency
                    })}
                    min={searchParams.checkIn || searchParams.date || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Rooms</label>
                <div className="relative">
                  <FaHotel className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary-500 transition-colors duration-200" />
                  <select
                    className={`${customInput} pl-10 hover:border-primary-300 focus:shadow-md appearance-none`}
                    value={searchParams.rooms}
                    onChange={(e) => setSearchParams({ ...searchParams, rooms: e.target.value })}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Room' : 'Rooms'}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                    <FaChevronRight className="transform rotate-90 w-4 h-4" />
                  </div>
                </div>
              </div>
              
              <div className="group">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Guests</label>
                <div className="relative">
                  <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary-500 transition-colors duration-200" />
                  <select
                    className={`${customInput} pl-10 hover:border-primary-300 focus:shadow-md appearance-none`}
                    value={searchParams.guests}
                    onChange={(e) => setSearchParams({ ...searchParams, guests: e.target.value })}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                    <FaChevronRight className="transform rotate-90 w-4 h-4" />
                  </div>
                </div>
              </div>
              
              <div className="group">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Room Type</label>
                <div className="relative">
                  <FaSuitcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-primary-500 transition-colors duration-200" />
                  <select
                    className={`${customInput} pl-10 hover:border-primary-300 focus:shadow-md appearance-none`}
                    value={searchParams.class}
                    onChange={(e) => setSearchParams({ ...searchParams, class: e.target.value })}
                  >
                    <option value="all">All Types</option>
                    <option value="standard">Standard Room</option>
                    <option value="deluxe">Deluxe Room</option>
                    <option value="suite">Suite</option>
                    <option value="villa">Villa/Cottage</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                    <FaChevronRight className="transform rotate-90 w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <h4 className="font-medium text-gray-800 dark:text-white mb-2 flex items-center">
                  <FaWifi className="mr-2 text-primary-500" /> Popular Amenities
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['Free WiFi', 'Breakfast Included', 'Swimming Pool', 'Parking'].map((amenity, index) => (
                    <label key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer">
                      <input type="checkbox" className="mr-2 text-primary-600 focus:ring-primary-500" />
                      {amenity}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  // Render search results with enhanced UI and details
  const renderResults = () => {
    // Mock sorted and filtered results
    const results = [...mockResults[activeTab as keyof typeof mockResults]].sort((a, b) => {
      if (sortBy === 'price') {
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      } else if (sortBy === 'duration') {
        // Simple duration comparison (just for demo)
        // Check if both entries have duration property (not for hotels)
        if ('duration' in a && 'duration' in b) {
          return a.duration.localeCompare(b.duration);
        }
        return 0;
      } else {
        return b.rating - a.rating;
      }
    });

    if (results.length === 0) {
      return (
        <div className="text-center py-12">
          <FaSearch className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No results found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search criteria or filters</p>
        </div>
      );
    }

    // Conditional rendering based on active tab
    if (activeTab === 'flights') {
      return (
        <div className="space-y-6">
          {results.map((result) => {
            // Cast to the appropriate type
            const flightResult = result as FlightResult;
            return (
              <motion.div
                key={flightResult.id}
                layoutId={`flight-${flightResult.id}`}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 border-2 ${
                  showDetailedView === flightResult.id ? 'border-primary-500' : 'border-transparent'
                }`}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    {/* Airline info */}
                    <div className="flex items-center">
                      <div className="w-12 h-12 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-full mr-4 overflow-hidden">
                        {flightResult.logo ? (
                          <Image src={flightResult.logo} alt={flightResult.airline} width={48} height={48} />
                        ) : (
                          <FaPlane className="w-6 h-6 m-3 text-primary-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{flightResult.airline}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{flightResult.flightNumber}</p>
                      </div>
                    </div>
                    
                    {/* Flight details */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-semibold">{flightResult.departure}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{searchParams.from}</div>
                      </div>
                      
                      <div className="mx-4 flex flex-col items-center px-6">
                        <div className="text-xs text-gray-500 dark:text-gray-400">{flightResult.duration}</div>
                        <div className="relative w-24 md:w-32 h-0.5 bg-gray-300 dark:bg-gray-600 my-2">
                          <div className="absolute top-1/2 left-0 w-2 h-2 -mt-1 rounded-full bg-primary-600"></div>
                          <div className="absolute top-1/2 right-0 w-2 h-2 -mt-1 rounded-full bg-primary-600"></div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{flightResult.stops}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-semibold">{flightResult.arrival}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{searchParams.to}</div>
                      </div>
                    </div>
                    
                    {/* Price and booking */}
                    <div className="text-right flex flex-col items-end">
                      <div className="mb-2">
                        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{flightResult.price}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{flightResult.class}</div>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < Math.floor(flightResult.rating) 
                                  ? 'text-yellow-400' 
                                  : i < flightResult.rating 
                                  ? 'text-yellow-300' 
                                  : 'text-gray-300 dark:text-gray-600'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{flightResult.rating}</span>
                      </div>
                      
                      <motion.button 
                        onClick={() => handleBooking(flightResult)}
                        className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Expandable details section */}
                  <motion.div className="mt-4">
                    <button 
                      onClick={() => setShowDetailedView(showDetailedView === flightResult.id ? null : flightResult.id)}
                      className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium"
                    >
                      {showDetailedView === flightResult.id ? 'Hide details' : 'Show details'}
                      <FaChevronRight className={`ml-1 transform transition-transform ${
                        showDetailedView === flightResult.id ? 'rotate-90' : ''
                      }`} />
                    </button>
                    
                    <AnimatePresence>
                      {showDetailedView === flightResult.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Amenities */}
                            <div>
                              <h4 className="font-semibold mb-2">Amenities</h4>
                              <ul className="space-y-1">
                                {flightResult.amenities?.map((amenity, index) => (
                                  <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                    <FaChevronRight className="w-3 h-3 mr-2 text-primary-600" />
                                    {amenity}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Baggage */}
                            <div>
                              <h4 className="font-semibold mb-2">Baggage</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{flightResult.baggage}</p>
                            </div>
                            
                            {/* Cancellation Policy */}
                            <div>
                              <h4 className="font-semibold mb-2">Cancellation Policy</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{flightResult.cancellationPolicy}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      );
    } else if (activeTab === 'trains') {
      return (
        <div className="space-y-6">
          {results.map((result) => {
            // Cast to the appropriate type
            const trainResult = result as TrainResult;
            return (
              <motion.div
                key={trainResult.id}
                layoutId={`train-${trainResult.id}`}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 border-2 ${
                  showDetailedView === trainResult.id ? 'border-primary-500' : 'border-transparent'
                }`}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    {/* Train info */}
                    <div>
                      <h3 className="text-lg font-semibold">{trainResult.trainName}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{trainResult.trainNumber}</p>
                    </div>
                    
                    {/* Train journey details */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-semibold">{trainResult.departure}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{searchParams.from}</div>
                      </div>
                      
                      <div className="mx-4 flex flex-col items-center px-6">
                        <div className="text-xs text-gray-500 dark:text-gray-400">{trainResult.duration}</div>
                        <div className="relative w-24 md:w-32 h-0.5 bg-gray-300 dark:bg-gray-600 my-2">
                          <div className="absolute top-1/2 left-0 w-2 h-2 -mt-1 rounded-full bg-primary-600"></div>
                          <div className="absolute top-1/2 right-0 w-2 h-2 -mt-1 rounded-full bg-primary-600"></div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{trainResult.distanceCovered}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-semibold">{trainResult.arrival}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{searchParams.to}</div>
                      </div>
                    </div>
                    
                    {/* Price and booking */}
                    <div className="text-right flex flex-col items-end">
                      <div className="mb-2">
                        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{trainResult.price}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{trainResult.class}</div>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < trainResult.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                      
                      <motion.button 
                        onClick={() => handleBooking(trainResult)}
                        className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Expandable details section */}
                  <motion.div className="mt-4">
                    <button 
                      onClick={() => setShowDetailedView(showDetailedView === trainResult.id ? null : trainResult.id)}
                      className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium"
                    >
                      {showDetailedView === trainResult.id ? 'Hide details' : 'Show details'}
                      <FaChevronRight className={`ml-1 transform transition-transform ${
                        showDetailedView === trainResult.id ? 'rotate-90' : ''
                      }`} />
                    </button>
                    
                    <AnimatePresence>
                      {showDetailedView === trainResult.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Amenities */}
                            <div>
                              <h4 className="font-semibold mb-2">Amenities</h4>
                              <ul className="space-y-1">
                                {trainResult.amenities?.map((amenity, index) => (
                                  <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                    <FaChevronRight className="w-3 h-3 mr-2 text-primary-600" />
                                    {amenity}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Platform */}
                            <div>
                              <h4 className="font-semibold mb-2">Platform</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{trainResult.platform}</p>
                            </div>
                            
                            {/* Seats */}
                            <div>
                              <h4 className="font-semibold mb-2">Seats</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{trainResult.seats}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      );
    } else if (activeTab === 'buses') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => {
            const busResult = result as BusResult;
            
            return (
              <motion.div
                key={busResult.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{busResult.operator}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{busResult.busType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{busResult.price}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{busResult.seats}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-medium">{busResult.departure}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{searchParams.from}</p>
                  </div>
                  <FaArrowRight className="text-gray-400" />
                  <div className="text-right">
                    <p className="font-medium">{busResult.arrival}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{searchParams.to}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{busResult.rating}</span>
                  </div>
                  <motion.button 
                    onClick={() => handleBooking(busResult)}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      );
    } else if (activeTab === 'hotels') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => {
            const hotelResult = result as HotelResult;
            
            return (
              <motion.div
                key={hotelResult.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{hotelResult.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{hotelResult.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{hotelResult.price}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">per night</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2 relative overflow-hidden">
                    {hotelResult.image ? (
                      <Image 
                        src={hotelResult.image} 
                        alt={hotelResult.name} 
                        layout="fill" 
                        objectFit="cover" 
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <FaHotel className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {hotelResult.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                        {amenity}
                      </span>
                    ))}
                    {hotelResult.amenities.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                        +{hotelResult.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{hotelResult.rating}</span>
                  </div>
                  <motion.button 
                    onClick={() => handleBooking(hotelResult)}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      );
    }
    
    // If we reach here, it means an unknown tab is active
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">Unknown tab selected</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Please select a valid tab</p>
      </div>
    );
  };

  // Render filter options panel with improved UI
  const renderFilterOptions = () => {
    return (
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Filter Results</h3>
          <button 
            onClick={() => setShowFilters(false)}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium mb-3 text-gray-800 dark:text-white">Price Range</h4>
            <div className="px-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">₹{filterOptions.priceRange[0]}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">₹{filterOptions.priceRange[1]}</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1"></div>
                <div 
                  className="absolute inset-y-0 bg-primary-500 rounded-full h-2 mt-1"
                  style={{ 
                    width: `${((filterOptions.priceRange[1] - filterOptions.priceRange[0]) / 25000) * 100}%`,
                    left: `${(filterOptions.priceRange[0] / 25000) * 100}%`
                  }}
                ></div>
              </div>
              <input
                type="range"
                min="0"
                max="25000"
                value={filterOptions.priceRange[1]}
                onChange={(e) => setFilterOptions({
                  ...filterOptions,
                  priceRange: [filterOptions.priceRange[0], parseInt(e.target.value)]
                })}
                className="w-full mt-3 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600"
              />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-gray-800 dark:text-white">Options</h4>
            <div className="space-y-2 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              {activeTab === 'flights' && (
                <label className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterOptions.directOnly}
                    onChange={(e) => setFilterOptions({
                      ...filterOptions,
                      directOnly: e.target.checked
                    })}
                    className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <div>
                    <span className="font-medium">Direct flights only</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Skip flights with connections</p>
                  </div>
                </label>
              )}
              
              <label className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterOptions.refundableOnly}
                  onChange={(e) => setFilterOptions({
                    ...filterOptions,
                    refundableOnly: e.target.checked
                  })}
                  className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 rounded"
                />
                <div>
                  <span className="font-medium">Refundable only</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Show only refundable options</p>
                </div>
              </label>
              
              {activeTab === 'hotels' && (
                <label className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <div>
                    <span className="font-medium">Free cancellation</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">No cancellation fees</p>
                  </div>
                </label>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-gray-800 dark:text-white">Minimum Rating</h4>
            <div className="flex flex-col space-y-2">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Select minimum rating</span>
                  <span className="text-sm font-bold text-primary-600">{filterOptions.rating}+</span>
                </div>
                <div className="flex items-center justify-between">
                  {[0, 1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilterOptions({
                        ...filterOptions,
                        rating: filterOptions.rating === rating ? 0 : rating
                      })}
                      className={`w-9 h-9 flex items-center justify-center rounded-full ${
                        filterOptions.rating >= rating && rating > 0
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                      } transition-colors ${rating === 0 ? 'text-xs' : ''}`}
                    >
                      {rating === 0 ? 'Any' : <FaStar className={`w-4 h-4 ${filterOptions.rating >= rating ? 'text-white' : 'text-yellow-400'}`} />}
                    </button>
                  ))}
                </div>
              </div>
              
              {activeTab === 'flights' && (
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                  <h5 className="text-sm font-medium mb-2">Airlines</h5>
                  <div className="space-y-1 max-h-28 overflow-y-auto pr-2">
                    {Array.from(new Set(mockResults.flights.map(f => f.airline))).map((airline, index) => (
                      <label key={index} className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 rounded cursor-pointer">
                        <input type="checkbox" className="mr-2 text-primary-600" />
                        <span className="text-sm">{airline}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              // Reset filters
              setFilterOptions({
                priceRange: [0, 25000],
                directOnly: false,
                refundableOnly: false,
                rating: 0
              });
            }}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 mr-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            Reset
          </button>
          <button
            onClick={() => {
              // Apply filters
              setShowFilters(false);
              // Normally would filter results here, but our demo uses static data
            }}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
          >
            Apply Filters
          </button>
        </div>
      </motion.div>
    );
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Hero Section with Parallax Effect */}
      <section className="relative h-auto min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image - Using a gradient as fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700">
          {/* Could add an Image component here with actual background image and parallax effect */}
          <motion.div 
            className="absolute inset-0 bg-[url('/profile-placeholder.jpg')] bg-cover bg-center opacity-30"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
        </div>
        
        {/* Animated decorative elements */}
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full opacity-20 blur-3xl"
          animate={{ 
            x: [0, 50, -20, 0],
            y: [0, -30, 50, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            repeatType: 'mirror', 
            ease: 'easeInOut' 
          }}
        />
        
        <motion.div 
          className="absolute bottom-10 right-20 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl"
          animate={{ 
            x: [0, -70, 30, 0],
            y: [0, 50, -40, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            repeatType: 'mirror', 
            ease: 'easeInOut',
            delay: 2
          }}
        />
        
        <motion.div 
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Explore the World with Us
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Discover amazing destinations, find the best deals for flights, trains, buses, and hotels
            </motion.p>
          </div>

          {/* Enhanced Booking Form with Glassomorphism */}
          <motion.div 
            className="bg-white/10 backdrop-blur-lg dark:bg-gray-800/50 rounded-xl shadow-2xl p-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 md:p-8">
              {/* Tab Navigation with Sliding Indicator */}
              <div className="flex space-x-1 mb-8 relative bg-gray-100 dark:bg-gray-700 p-1 rounded-lg overflow-hidden">
                <div 
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-md transition-all duration-300"
                  style={{ 
                    width: `${100 / 4}%`, 
                    transform: `translateX(${['flights', 'trains', 'buses', 'hotels'].indexOf(activeTab) * 100}%)` 
                  }}
                />
                {['flights', 'trains', 'buses', 'hotels'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab as 'flights' | 'trains' | 'buses' | 'hotels');
                      setShowResults(false);
                    }}
                    className={`flex-1 px-4 py-3 rounded-md font-medium z-10 transition-colors relative flex items-center justify-center ${
                      activeTab === tab
                        ? 'text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <span className={`mr-2 ${activeTab === tab ? 'text-white' : 'text-primary-500 dark:text-primary-400'}`}>
                      {tab === 'flights' ? <FaPlane /> : 
                       tab === 'trains' ? <FaTrain /> : 
                       tab === 'buses' ? <FaBus /> : 
                       <FaHotel />}
                    </span>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Search Section */}
              <div className="space-y-6 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
                {renderInputFields()}
              </div>

              {/* Search Button */}
              <div className="mt-8">
                <motion.button 
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  <span className="flex items-center justify-center text-lg">
                    <FaSearch className="mr-2" />
                    Search {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </span>
                </motion.button>
                <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">By searching, you agree to our Terms of Service and Privacy Policy</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Results Section */}
      {showResults && (
        <motion.section
          className="py-12 bg-gray-100 dark:bg-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Enhanced Results Header */}
            <div className="flex flex-col mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Search Results</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {activeTab === 'flights' ? 'Flights from ' : 
                      activeTab === 'trains' ? 'Trains from ' : 
                      activeTab === 'buses' ? 'Buses from ' : 'Hotels in '}
                      <span className="font-semibold text-primary-600 dark:text-primary-400">{searchParams.from}</span>
                      {activeTab !== 'hotels' && (
                        <>
                          {' to '}
                          <span className="font-semibold text-primary-600 dark:text-primary-400">{searchParams.to}</span>
                        </>
                      )}
                      {' on '}
                      <span className="font-semibold">
                        {new Date(searchParams.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      {searchParams.tripType === 'round-trip' && searchParams.returnDate && (
                        <>
                          {' - '}
                          <span className="font-semibold">
                            {new Date(searchParams.returnDate).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="flex gap-3 w-full md:w-auto">
                      <div className="relative flex-1 md:flex-auto">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaSortAmountDown className="text-gray-500" />
                        </div>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full md:w-auto pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white dark:bg-gray-700 shadow-sm"
                        >
                          <option value="price">Sort by Price</option>
                          <option value="duration">Sort by Duration</option>
                          <option value="rating">Sort by Rating</option>
                          {activeTab === 'flights' && <option value="departing">Departing Time</option>}
                          {activeTab === 'flights' && <option value="arriving">Arriving Time</option>}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                          <FaChevronRight className="transform rotate-90 w-4 h-4" />
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
                      >
                        <FaFilter className="mr-2" />
                        Filters
                        <span className={`ml-2 w-5 h-5 rounded-full text-xs flex items-center justify-center ${
                          filterOptions.directOnly || filterOptions.refundableOnly || filterOptions.rating > 0 
                            ? 'bg-primary-500 text-white' 
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                        }`}>
                          {(filterOptions.directOnly ? 1 : 0) + 
                           (filterOptions.refundableOnly ? 1 : 0) + 
                           (filterOptions.rating > 0 ? 1 : 0)}
                        </span>
                      </button>
                    </div>
                    
                    <button
                      onClick={() => {
                        // Reset all filters and sorting
                        setSortBy('price');
                        setFilterOptions({
                          priceRange: [0, 25000],
                          directOnly: false,
                          refundableOnly: false,
                          rating: 0
                        });
                      }}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium flex items-center justify-center bg-gray-100 dark:bg-gray-700/50 rounded-lg shadow-sm"
                    >
                      <FaTimes className="mr-2" /> Reset Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {showFilters && renderFilterOptions()}
            </AnimatePresence>
            
            {renderResults()}
          </div>
        </motion.section>
      )}

      {/* Enhanced Services Section with Gradient Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-3 px-3 py-1 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full">
              <span className="text-sm font-medium bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                OUR SERVICES
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Comprehensive Travel Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need for your perfect journey, all in one place
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate={controls}
            viewport={{ once: true }}
          >
            {travelServices.slice(0, 6).map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group"
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                <Link href={service.href} className="block p-6">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br ${service.color} text-white mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{service.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <span className="w-5 h-5 inline-flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mr-2">
                          <FaChevronRight className="w-3 h-3" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="text-primary-600 dark:text-primary-400 font-semibold flex items-center group-hover:translate-x-2 transition-transform duration-300">
                    Explore {service.name}
                    <FaChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Popular Destinations with Image Cards */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-3 px-3 py-1 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full">
              <span className="text-sm font-medium bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                POPULAR DESTINATIONS
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Trending Destinations
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our most sought-after travel destinations
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
                whileHover={{ y: -10 }}
                className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden group h-96"
              >
                {/* Background image */}
                <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700">
                  {destination.image && (
                    <Image 
                      src={destination.image} 
                      alt={destination.name} 
                      layout="fill" 
                      objectFit="cover" 
                      className="transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                  <p className="text-gray-200 mb-3 line-clamp-2 text-sm">
                    {destination.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-primary-400">
                      {destination.price}
                    </span>
                    <div className="flex items-center text-yellow-400">
                      <FaStar className="w-4 h-4 mr-1" />
                      <span>{destination.rating}</span>
                    </div>
                  </div>
                  
                  {/* Hidden details that show on hover */}
                  <div className="overflow-hidden">
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      whileHover={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="pt-3 border-t border-gray-600 mb-3">
                        <p className="text-sm text-gray-300 mb-1">
                          <FaCalendarAlt className="inline-block mr-2" />
                          Best time: {destination.bestTimeToVisit}
                        </p>
                        <p className="text-sm text-gray-300">
                          <FaRegClock className="inline-block mr-2" />
                          Flight duration: {destination.flightDuration}
                        </p>
                      </div>
                      <button className="w-full py-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 rounded-lg text-white font-medium transition-colors">
                        Explore Packages
                      </button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Travel Tips Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-3 px-3 py-1 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full">
              <span className="text-sm font-medium bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                TRAVEL SMARTER
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Essential Travel Tips
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Make your travel experience smoother and more enjoyable
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {travelTips.map((tip, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-t-4 border-primary-500"
              >
                <div className="bg-primary-100 dark:bg-primary-900/30 w-14 h-14 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{tip.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {tip.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-3 px-3 py-1 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full">
              <span className="text-sm font-medium bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                TESTIMONIALS
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Travel Stories from Our Customers
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hear about the amazing experiences of travelers who booked with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {travelExperiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 relative"
              >
                <div className="absolute top-6 right-6 text-primary-200 dark:text-primary-900 opacity-30">
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.983 3V11.015H5.945V7.007C5.945 4.421 7.398 3 9.983 3ZM21.061 3V11.015H17.023V7.007C17.023 4.421 18.476 3 21.061 3ZM5.945 15.012V21H3V14.987L8.012 8.005H10.984L5.945 15.012ZM17.023 15.012V21H14.061V14.987L19.073 8.005H22.044L17.023 15.012Z" />
                  </svg>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden mr-4">
                    {experience.image ? (
                      <Image src={experience.image} alt={experience.name} width={48} height={48} className="object-cover" />
                    ) : (
                      <FaUser className="w-full h-full p-2 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{experience.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{experience.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 relative z-10">
                  "{experience.testimonial}"
                </p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(experience.rating)
                          ? 'text-yellow-400'
                          : i < experience.rating
                          ? 'text-yellow-300'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="text-xl opacity-90 max-w-xl">
                Book your travel experience today and create memories that last a lifetime
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="px-8 py-4 bg-white text-primary-600 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg flex items-center">
                Plan Your Trip Now
                <FaArrowRight className="ml-2" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 
