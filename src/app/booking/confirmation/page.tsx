"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaCheckCircle, FaTicketAlt, FaHome } from "react-icons/fa";

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id") || "";
  const [loading, setLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  
  useEffect(() => {
    // In a real app, we would fetch the booking details from the API
    // For now, simulate a successful booking fetch
    const timer = setTimeout(() => {
      setBookingDetails({
        id: bookingId,
        status: "confirmed",
        pnr: generatePNR(),
      });
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [bookingId]);
  
  // Generate a random PNR number
  const generatePNR = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pnr = '';
    for (let i = 0; i < 6; i++) {
      pnr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pnr;
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="w-16 h-16 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mb-8"></div>
        <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">Processing Your Booking</h2>
        <p className="text-gray-500 dark:text-gray-400">Please wait while we confirm your booking details...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <FaCheckCircle className="w-20 h-20 mx-auto text-green-500 mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your booking has been confirmed successfully.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-primary-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium">Booking Confirmed</h2>
                <p className="text-primary-100">Thank you for your booking!</p>
              </div>
              <FaTicketAlt size={32} className="text-primary-100" />
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Booking ID</p>
                <p className="text-lg font-mono font-medium">{bookingDetails.id}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">PNR Number</p>
                <p className="text-lg font-mono font-medium">{bookingDetails.pnr}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</p>
                <p className="text-lg font-medium text-green-600 dark:text-green-400">Confirmed</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Booked On</p>
                <p className="text-lg font-medium">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We've sent the booking details to your email address. You can also view your booking in the My Bookings section.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link 
                  href="/dashboard/bookings"
                  className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium text-center transition-colors flex items-center justify-center"
                >
                  <FaTicketAlt className="mr-2" />
                  View My Bookings
                </Link>
                
                <Link 
                  href="/travel"
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg font-medium text-center transition-colors flex items-center justify-center"
                >
                  <FaHome className="mr-2" />
                  Return to Travel Home
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>
            Need help? Contact our customer support at{" "}
            <a href="tel:18001234567" className="text-primary-600 dark:text-primary-400 hover:underline">
              1800-123-4567
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 