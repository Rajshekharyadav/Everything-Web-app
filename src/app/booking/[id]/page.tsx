"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaMapMarkerAlt, FaPlane, FaTrain, FaBus, FaHotel, FaCreditCard, FaCheck, FaPrint, FaDownload } from 'react-icons/fa';

// Sample booking data - in a real app, this would come from an API
const mockBookings = {
  'flight-123': {
    id: 'flight-123',
    type: 'flight',
    title: 'Flight to Paris',
    provider: 'Air France',
    bookingNumber: 'AF123456',
    date: '2023-12-15',
    time: '08:30 AM',
    from: 'New York (JFK)',
    to: 'Paris (CDG)',
    duration: '7h 45m',
    passengers: 2,
    amount: '$1,245.00',
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFyaXN8ZW58MHx8MHx8fDA%3D'
  },
  'train-456': {
    id: 'train-456',
    type: 'train',
    title: 'Express Train to Edinburgh',
    provider: 'British Rail',
    bookingNumber: 'BR789012',
    date: '2023-11-20',
    time: '10:15 AM',
    from: 'London (Kings Cross)',
    to: 'Edinburgh (Waverley)',
    duration: '4h 30m',
    passengers: 1,
    amount: '£95.50',
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1581878361684-5d343edf2581?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVkaW5idXJnaHxlbnwwfHwwfHx8MA%3D%3D'
  },
  'bus-789': {
    id: 'bus-789',
    type: 'bus',
    title: 'Bus to Washington DC',
    provider: 'Greyhound',
    bookingNumber: 'GH345678',
    date: '2023-12-05',
    time: '09:00 AM',
    from: 'New York (Port Authority)',
    to: 'Washington DC (Union Station)',
    duration: '4h 15m',
    passengers: 3,
    amount: '$78.00',
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1617581629397-a72507c3de82?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FzaGluZ3RvbiUyMGRjfGVufDB8fDB8fHww'
  },
  'hotel-012': {
    id: 'hotel-012',
    type: 'hotel',
    title: 'Luxury Stay in Tokyo',
    provider: 'Grand Hyatt Tokyo',
    bookingNumber: 'HYT901234',
    checkIn: '2023-12-25',
    checkOut: '2023-12-30',
    location: 'Tokyo, Japan',
    roomType: 'Deluxe King',
    guests: 2,
    nights: 5,
    amount: '¥250,000',
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9reW98ZW58MHx8MHx8fDA%3D'
  }
};

export default function BookingDetails() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to get booking details
    setTimeout(() => {
      const id = params?.id as string;
      const foundBooking = mockBookings[id as keyof typeof mockBookings];
      
      if (foundBooking) {
        setBooking(foundBooking);
      } else {
        setError('Booking not found. It may have been cancelled or the link is invalid.');
      }
      
      setLoading(false);
    }, 1000);
  }, [params]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return <FaPlane className="text-primary-500" />;
      case 'train':
        return <FaTrain className="text-primary-500" />;
      case 'bus':
        return <FaBus className="text-primary-500" />;
      case 'hotel':
        return <FaHotel className="text-primary-500" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-t-4 border-primary-500 border-solid rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Loading booking details...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-lg text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-yellow-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Booking Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <Link href="/travel" className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
            Return to Travel Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
        >
          {/* Header with background image */}
          <div className="relative h-48 bg-primary-600">
            {booking.image && (
              <Image
                src={booking.image}
                alt={booking.title}
                layout="fill"
                objectFit="cover"
                className="opacity-70"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <div className="flex items-center mb-2">
                {getIcon(booking.type)}
                <span className="ml-2 text-sm font-medium uppercase">{booking.type} Booking</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold">{booking.title}</h1>
              <p className="text-white/90">{booking.provider}</p>
            </div>
            <button
              onClick={() => router.back()}
              className="absolute top-4 left-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
            >
              <FaArrowLeft />
            </button>
          </div>

          {/* Booking status */}
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
            <div className="flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <div>
                <span className="font-medium text-green-700 dark:text-green-400">Booking Confirmed</span>
                <p className="text-sm text-green-600 dark:text-green-300">Booking Number: {booking.bookingNumber}</p>
              </div>
            </div>
          </div>

          {/* Booking details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {booking.type === 'hotel' ? (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Check-in</h3>
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-gray-400 mr-2" />
                      <span className="font-semibold text-gray-800 dark:text-white">{booking.checkIn}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Check-out</h3>
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-gray-400 mr-2" />
                      <span className="font-semibold text-gray-800 dark:text-white">{booking.checkOut}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Location</h3>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-gray-400 mr-2" />
                      <span className="font-semibold text-gray-800 dark:text-white">{booking.location}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Room Type</h3>
                    <div className="flex items-center">
                      <FaHotel className="text-gray-400 mr-2" />
                      <span className="font-semibold text-gray-800 dark:text-white">{booking.roomType}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Guests</h3>
                    <div className="flex items-center">
                      <FaUser className="text-gray-400 mr-2" />
                      <span className="font-semibold text-gray-800 dark:text-white">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Stay Duration</h3>
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-gray-400 mr-2" />
                      <span className="font-semibold text-gray-800 dark:text-white">{booking.nights} {booking.nights === 1 ? 'Night' : 'Nights'}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Date & Time</h3>
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-gray-400 mr-2" />
                      <span className="font-semibold text-gray-800 dark:text-white">{booking.date}, {booking.time}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">From</h3>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-gray-400 mr-2" />
                      <span className="font-semibold text-gray-800 dark:text-white">{booking.from}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">To</h3>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-gray-400 mr-2" />
                      <span className="font-semibold text-gray-800 dark:text-white">{booking.to}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Duration</h3>
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-800 dark:text-white">{booking.duration}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Passengers</h3>
                    <div className="flex items-center">
                      <FaUser className="text-gray-400 mr-2" />
                      <span className="font-semibold text-gray-800 dark:text-white">{booking.passengers} {booking.passengers === 1 ? 'Passenger' : 'Passengers'}</span>
                    </div>
                  </div>
                </>
              )}
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Amount</h3>
                <div className="flex items-center">
                  <FaCreditCard className="text-gray-400 mr-2" />
                  <span className="font-semibold text-xl text-primary-600 dark:text-primary-400">{booking.amount}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-wrap gap-3">
              <button className="flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md">
                <FaPrint className="mr-2" />
                Print Ticket
              </button>
              <button className="flex items-center justify-center bg-white dark:bg-gray-700 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 py-2 px-4 rounded-md">
                <FaDownload className="mr-2" />
                Download E-Ticket
              </button>
              <Link href="/travel" className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-white py-2 px-4 rounded-md ml-auto">
                <FaArrowLeft className="mr-2" />
                Back to Travel
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 