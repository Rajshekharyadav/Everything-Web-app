import React from "react";
import { FaPlane, FaTrain, FaBus, FaHotel, FaEnvelope, FaPhone, FaUser, FaSuitcase, FaTicketAlt, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaRupeeSign, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";

interface BookingSummaryProps {
  bookingDetails: {
    type: string;
    from: string;
    to: string;
    date: string;
    returnDate?: string;
    price: string;
    selectedSeats: string[];
    contactEmail: string;
    contactPhone: string;
    passengerDetails: {
      name: string;
      age: string;
      gender: string;
    }[];
    paymentMethod: string;
  };
  bookingId: string;
}

export default function BookingSummary({ bookingDetails, bookingId }: BookingSummaryProps) {
  // Generate a random PNR number
  const generatePNR = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pnr = '';
    for (let i = 0; i < 6; i++) {
      pnr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pnr;
  };

  const pnr = generatePNR();
  
  // Get the appropriate icon for booking type
  const getTypeIcon = () => {
    switch(bookingDetails.type) {
      case "flight":
        return <FaPlane className="text-primary-500" />;
      case "train":
        return <FaTrain className="text-primary-500" />;
      case "bus":
        return <FaBus className="text-primary-500" />;
      case "hotel":
        return <FaHotel className="text-primary-500" />;
      default:
        return <FaTicketAlt className="text-primary-500" />;
    }
  };
  
  // Get payment method display name
  const getPaymentMethodName = (method: string) => {
    switch(method) {
      case "credit-card": return "Credit/Debit Card";
      case "upi": return "UPI Payment";
      case "paypal": return "PayPal";
      case "google-pay": return "Google Pay";
      case "apple-pay": return "Apple Pay";
      default: return method;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800 text-center mb-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mb-4"
        >
          <FaTicketAlt className="text-green-600 dark:text-green-300 text-2xl" />
        </motion.div>
        <h2 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">Booking Confirmed!</h2>
        <p className="text-green-700 dark:text-green-400">
          Your booking has been confirmed and ticket details have been sent to your email.
        </p>
        <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-700">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="flex items-center">
              <span className="text-green-700 dark:text-green-400 font-medium mr-2">Booking ID:</span>
              <span className="font-mono font-bold">{bookingId}</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-700 dark:text-green-400 font-medium mr-2">PNR:</span>
              <span className="font-mono font-bold">{pnr}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="bg-primary-600 dark:bg-primary-800 p-4 flex items-center">
          <div className="mr-3 bg-white bg-opacity-20 p-2 rounded-full">
            {getTypeIcon()}
          </div>
          <h3 className="text-white font-semibold text-lg">
            {bookingDetails.type.charAt(0).toUpperCase() + bookingDetails.type.slice(1)} Ticket
          </h3>
        </div>
        
        <div className="p-6">
          {/* Journey/Stay Details */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
              <FaSuitcase className="mr-2" />
              Journey Details
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
              <div className="flex flex-col md:flex-row md:items-center mb-4">
                <div className="flex-1">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-gray-500 mt-1 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">From</p>
                      <p className="font-medium">{bookingDetails.from}</p>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:block text-center py-4">
                  <div className="w-24 h-0.5 bg-gray-300 dark:bg-gray-600 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-gray-500 mt-1 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">To</p>
                      <p className="font-medium">{bookingDetails.to}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-start">
                  <FaCalendarAlt className="text-gray-500 mt-1 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                    <p className="font-medium">{bookingDetails.date}</p>
                  </div>
                </div>
                
                {bookingDetails.returnDate && (
                  <div className="flex items-start">
                    <FaCalendarAlt className="text-gray-500 mt-1 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Return Date</p>
                      <p className="font-medium">{bookingDetails.returnDate}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <FaSuitcase className="text-gray-500 mt-1 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Selected Seats</p>
                    <p className="font-medium">
                      {bookingDetails.selectedSeats.join(", ")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaRupeeSign className="text-gray-500 mt-1 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Amount</p>
                    <p className="font-bold text-primary-600 dark:text-primary-400">{bookingDetails.price}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Passenger Details */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
              <FaUser className="mr-2" />
              Passenger Information
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
              <div className="grid grid-cols-1 gap-4">
                {bookingDetails.passengerDetails.map((passenger, index) => (
                  <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Passenger {index + 1}</h5>
                      <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                        {passenger.gender}
                      </span>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200">{passenger.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Age: {passenger.age}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <FaEnvelope className="text-gray-500 mt-1 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium">{bookingDetails.contactEmail}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaPhone className="text-gray-500 mt-1 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-medium">{bookingDetails.contactPhone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment Information */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
              <FaRupeeSign className="mr-2" />
              Payment Information
            </h4>
            
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Payment Method</p>
                    <p className="font-medium">{getPaymentMethodName(bookingDetails.paymentMethod)}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Payment Status</p>
                    <p className="font-medium text-green-600 dark:text-green-400">Paid</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Transaction ID</p>
                    <p className="font-medium font-mono">TXN{Math.floor(Math.random() * 1000000)}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Amount Paid</p>
                    <p className="font-bold text-primary-600 dark:text-primary-400">{bookingDetails.price}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start">
            <FaInfoCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">Important Information</p>
              <ul className="text-xs text-blue-600 dark:text-blue-400 list-disc pl-5 space-y-1">
                <li>Please arrive at least 2 hours before departure time for check-in.</li>
                <li>Carry a valid ID proof for all passengers at the time of boarding.</li>
                <li>For any assistance, contact our 24/7 customer support at 1800-123-4567.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center gap-4 mt-8">
        <button 
          onClick={() => window.print()}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center"
        >
          <FaTicketAlt className="mr-2" />
          Print Ticket
        </button>
        
        <button 
          onClick={() => window.location.href = '/travel'}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Book Another Journey
        </button>
      </div>
    </div>
  );
} 