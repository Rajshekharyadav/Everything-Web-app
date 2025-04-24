"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaPlane, FaTrain, FaBus, FaHotel } from "react-icons/fa";
import { motion } from "framer-motion";

// Import components
import PassengerDetails from "./components/PassengerDetails";
import SeatSelection from "./components/SeatSelection";
import PaymentForm from "./components/PaymentForm";
import BookingSummary from "./components/BookingSummary";

// Booking page component
export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Extract data from URL parameters
  const type = searchParams.get("type") || "flight";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";
  const returnDate = searchParams.get("returnDate") || "";
  const price = searchParams.get("price") || "₹0";
  const bookingId = searchParams.get("id") || `BK${Math.floor(Math.random() * 1000000)}`;
  
  // Booking steps
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    type,
    from,
    to,
    date,
    returnDate,
    price,
    itemId: bookingId,
    selectedSeats: [] as string[],
    paymentMethod: "credit-card",
    contactEmail: "",
    contactPhone: "",
    passengerDetails: [{ name: "", age: "", gender: "Male" as "Male" | "Female" | "Other" }],
  });
  
  // State for each step's completion
  const [stepComplete, setStepComplete] = useState({
    1: false, // Passenger info
    2: false, // Seat selection
    3: false, // Payment details
  });
  
  // Function to handle step changes
  const goToNextStep = () => {
    // Validate current step before proceeding
    if (currentStep === 1 && !validatePassengerInfo()) {
      alert("Please fill in all passenger details correctly.");
      return;
    }
    
    if (currentStep === 2 && !validateSeatSelection()) {
      alert(`Please select ${bookingDetails.passengerDetails.length} seat(s).`);
      return;
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Update passenger details
  const handlePassengerDetailsChange = (passengerDetails: any[]) => {
    setBookingDetails({
      ...bookingDetails,
      passengerDetails
    });
  };
  
  // Update contact information
  const handleContactInfoChange = (field: "contactEmail" | "contactPhone", value: string) => {
    setBookingDetails({
      ...bookingDetails,
      [field]: value
    });
  };
  
  // Update seat selection
  const handleSeatSelectionChange = (selectedSeats: string[]) => {
    setBookingDetails({
      ...bookingDetails,
      selectedSeats
    });
  };
  
  // Update payment method
  const handlePaymentMethodChange = (method: string) => {
    setBookingDetails({
      ...bookingDetails,
      paymentMethod: method
    });
  };
  
  // Validation for passenger info
  const validatePassengerInfo = () => {
    const isValid = bookingDetails.passengerDetails.every(
      passenger => passenger.name.trim() !== "" && passenger.age.trim() !== ""
    ) && bookingDetails.contactEmail.includes('@') && bookingDetails.contactPhone.length >= 10;
    
    setStepComplete({
      ...stepComplete,
      1: isValid
    });
    
    return isValid;
  };
  
  // Validation for seat selection
  const validateSeatSelection = () => {
    const isValid = bookingDetails.selectedSeats.length === bookingDetails.passengerDetails.length;
    
    setStepComplete({
      ...stepComplete,
      2: isValid
    });
    
    return isValid;
  };
  
  // Validation for payment details
  const validatePaymentDetails = () => {
    // In a real app, there would be more complex validation
    const isValid = true;
    
    setStepComplete({
      ...stepComplete,
      3: isValid
    });
    
    return isValid;
  };
  
  // Handle submission
  const handleSubmitBooking = async () => {
    try {
      // In a real implementation, this would make an API call
      // to create the booking with all details
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: bookingDetails.type,
          from: bookingDetails.from,
          to: bookingDetails.to,
          date: bookingDetails.date,
          returnDate: bookingDetails.returnDate,
          passengers: bookingDetails.passengerDetails.length,
          class: "standard",
          price: parseFloat(bookingDetails.price.replace(/[^0-9.-]+/g,"")),
          status: 'confirmed',
          userId: 'user123', // Would come from auth in a real app
          selectedSeats: bookingDetails.selectedSeats,
          passengerDetails: bookingDetails.passengerDetails,
          contactEmail: bookingDetails.contactEmail,
          contactPhone: bookingDetails.contactPhone,
          paymentMethod: bookingDetails.paymentMethod,
          createdAt: new Date(),
          updatedAt: new Date()
        }),
      });
      
      // In a demo, we'll show the confirmation regardless
      // In a real app, we would check the response status
    } catch (error) {
      console.error("Error submitting booking:", error);
      // In a demo, we'll proceed anyway
      // In a real app, we would show an error message
    }
  };
  
  // Get icon based on booking type
  const getTypeIcon = () => {
    switch(type) {
      case "flight":
        return <FaPlane className="text-primary-500" />;
      case "train":
        return <FaTrain className="text-primary-500" />;
      case "bus":
        return <FaBus className="text-primary-500" />;
      case "hotel":
        return <FaHotel className="text-primary-500" />;
      default:
        return <FaPlane className="text-primary-500" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back to search results
        </button>
        
        <div className="flex items-center gap-3 mb-2">
          {getTypeIcon()}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {type.charAt(0).toUpperCase() + type.slice(1)} Booking
          </h1>
        </div>
        
        <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-300">
          <span className="font-medium mr-2">{from}</span>
          <span className="mx-2">→</span>
          <span className="font-medium mr-2">{to}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
          {returnDate && (
            <>
              <span className="mx-2">•</span>
              <span>Return: {returnDate}</span>
            </>
          )}
          <span className="mx-2">•</span>
          <span className="font-bold text-primary-600 dark:text-primary-400">{price}</span>
        </div>
      </div>
      
      {/* Booking Steps */}
      <div className="max-w-7xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between">
            {["Passenger Details", "Select Seats", "Payment", "Confirmation"].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-medium ${
                    currentStep > index + 1 
                      ? "bg-primary-500 text-white" 
                      : currentStep === index + 1
                        ? "bg-primary-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {currentStep > index + 1 ? "✓" : index + 1}
                </div>
                <span className={`mt-2 text-xs text-center ${
                  currentStep >= index + 1
                    ? "text-primary-500 font-medium"
                    : "text-gray-500 dark:text-gray-400"
                }`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 h-1 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
            <div 
              className="absolute top-0 h-1 bg-primary-500 rounded transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Step content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          {currentStep === 1 && (
            <PassengerDetails
              passengerDetails={bookingDetails.passengerDetails}
              contactEmail={bookingDetails.contactEmail}
              contactPhone={bookingDetails.contactPhone}
              onPassengerDetailsChange={handlePassengerDetailsChange}
              onContactInfoChange={handleContactInfoChange}
              onValidate={validatePassengerInfo}
            />
          )}
          
          {currentStep === 2 && (
            <SeatSelection
              bookingType={bookingDetails.type}
              numPassengers={bookingDetails.passengerDetails.length}
              selectedSeats={bookingDetails.selectedSeats}
              onSeatSelectionChange={handleSeatSelectionChange}
            />
          )}
          
          {currentStep === 3 && (
            <PaymentForm
              totalAmount={bookingDetails.price}
              onPaymentMethodChange={handlePaymentMethodChange}
              selectedPaymentMethod={bookingDetails.paymentMethod}
            />
          )}
          
          {currentStep === 4 && (
            <BookingSummary
              bookingDetails={bookingDetails}
              bookingId={bookingDetails.itemId}
            />
          )}
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && currentStep < 4 ? (
              <button
                onClick={goToPreviousStep}
                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Previous
              </button>
            ) : (
              <div></div>
            )}
            
            {currentStep < 4 ? (
              <button
                onClick={goToNextStep}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Continue
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 