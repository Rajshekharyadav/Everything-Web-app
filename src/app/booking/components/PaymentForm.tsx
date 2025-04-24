import { useState } from "react";
import { FaCreditCard, FaMoneyBillWave, FaPaypal, FaGooglePay, FaApplePay, FaInfoCircle, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

interface PaymentFormProps {
  totalAmount: string;
  onPaymentMethodChange: (method: string) => void;
  selectedPaymentMethod: string;
}

export default function PaymentForm({
  totalAmount,
  onPaymentMethodChange,
  selectedPaymentMethod
}: PaymentFormProps) {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });
  
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Payment methods
  const paymentMethods = [
    { id: "credit-card", name: "Credit/Debit Card", icon: <FaCreditCard /> },
    { id: "upi", name: "UPI Payment", icon: <FaMoneyBillWave /> },
    { id: "paypal", name: "PayPal", icon: <FaPaypal /> },
    { id: "google-pay", name: "Google Pay", icon: <FaGooglePay /> },
    { id: "apple-pay", name: "Apple Pay", icon: <FaApplePay /> }
  ];
  
  // Handle card detail changes
  const handleCardDetailChange = (field: keyof typeof cardDetails, value: string) => {
    setCardDetails({
      ...cardDetails,
      [field]: value
    });
  };
  
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };
  
  // Process payment
  const handleProcessPayment = () => {
    // In a real application, this would connect to a payment gateway
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">
          Payment Summary
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-blue-700 dark:text-blue-400">Total Amount</span>
          <span className="text-xl font-bold text-blue-800 dark:text-blue-300">{totalAmount}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {paymentMethods.map((method) => (
            <motion.div
              key={method.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => onPaymentMethodChange(method.id)}
              className={`
                p-4 border rounded-lg cursor-pointer flex items-center
                ${
                  selectedPaymentMethod === method.id
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                    : "border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                }
              `}
            >
              <div className={`mr-3 text-lg ${
                selectedPaymentMethod === method.id
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}>
                {method.icon}
              </div>
              <span className={
                selectedPaymentMethod === method.id
                  ? "font-medium text-primary-800 dark:text-primary-300"
                  : "text-gray-700 dark:text-gray-300"
              }>
                {method.name}
              </span>
              {selectedPaymentMethod === method.id && (
                <FaCheck className="ml-auto text-primary-600 dark:text-primary-400" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {selectedPaymentMethod === "credit-card" && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 className="font-medium mb-4">Card Details</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Card Number
              </label>
              <input
                type="text"
                maxLength={19}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.cardNumber}
                onChange={(e) => handleCardDetailChange("cardNumber", formatCardNumber(e.target.value))}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Name on Card
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800"
                placeholder="Enter name as on card"
                value={cardDetails.cardName}
                onChange={(e) => handleCardDetailChange("cardName", e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Expiry Date
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800"
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={(e) => handleCardDetailChange("expiryDate", e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  CVV
                </label>
                <input
                  type="text"
                  maxLength={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => handleCardDetailChange("cvv", e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="flex items-start mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
              <FaInfoCircle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                This is a demo. No actual payment will be processed. In a real application, this would be connected to a secure payment gateway.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {selectedPaymentMethod === "upi" && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 className="font-medium mb-4">UPI Payment</h4>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              UPI ID
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800"
              placeholder="username@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              required
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Enter your UPI ID (e.g., mobilenumber@upi)
            </p>
          </div>
          
          <div className="flex items-start mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
            <FaInfoCircle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              This is a demo. No actual payment will be processed. In a real application, this would initiate a UPI payment request.
            </p>
          </div>
        </div>
      )}
      
      {(selectedPaymentMethod === "paypal" || selectedPaymentMethod === "google-pay" || selectedPaymentMethod === "apple-pay") && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 className="font-medium mb-4">
            {selectedPaymentMethod === "paypal" ? "PayPal" : 
             selectedPaymentMethod === "google-pay" ? "Google Pay" : "Apple Pay"} Payment
          </h4>
          
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            You will be redirected to complete the payment after confirming your booking.
          </p>
          
          <div className="flex items-start mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
            <FaInfoCircle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              This is a demo. No actual payment will be processed. In a real application, this would redirect to the respective payment service.
            </p>
          </div>
        </div>
      )}
      
      {paymentSuccess ? (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700 text-center">
          <FaCheck className="mx-auto text-green-500 text-3xl mb-2" />
          <h4 className="text-green-800 dark:text-green-300 font-medium text-lg">Payment Successful!</h4>
          <p className="text-green-700 dark:text-green-400 text-sm">
            Your payment has been processed successfully. Please proceed to confirm your booking.
          </p>
        </div>
      ) : (
        <div className="mt-6">
          <button
            type="button"
            onClick={handleProcessPayment}
            disabled={isProcessing}
            className={`
              w-full py-3 rounded-lg font-medium transition-colors
              ${
                isProcessing
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-primary-600 hover:bg-primary-700 text-white"
              }
            `}
          >
            {isProcessing ? "Processing..." : `Process Payment (${totalAmount})`}
          </button>
        </div>
      )}
    </div>
  );
} 