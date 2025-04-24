import { useState } from "react";
import { FaPlus, FaTrash, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

interface PassengerDetail {
  name: string;
  age: string;
  gender: "Male" | "Female" | "Other";
}

interface PassengerDetailsProps {
  passengerDetails: PassengerDetail[];
  contactEmail: string;
  contactPhone: string;
  onPassengerDetailsChange: (passengerDetails: PassengerDetail[]) => void;
  onContactInfoChange: (field: "contactEmail" | "contactPhone", value: string) => void;
  onValidate: () => boolean;
}

export default function PassengerDetails({
  passengerDetails,
  contactEmail,
  contactPhone,
  onPassengerDetailsChange,
  onContactInfoChange,
  onValidate,
}: PassengerDetailsProps) {
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  
  // Handle adding new passenger
  const handleAddPassenger = () => {
    onPassengerDetailsChange([
      ...passengerDetails,
      { name: "", age: "", gender: "Male" },
    ]);
  };
  
  // Handle removing a passenger
  const handleRemovePassenger = (index: number) => {
    const updatedPassengers = [...passengerDetails];
    updatedPassengers.splice(index, 1);
    onPassengerDetailsChange(updatedPassengers);
  };
  
  // Handle change in passenger details
  const handlePassengerChange = (
    index: number,
    field: keyof PassengerDetail,
    value: string
  ) => {
    const updatedPassengers = [...passengerDetails];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };
    onPassengerDetailsChange(updatedPassengers);
    
    // Clear validation error when field is updated
    if (validationErrors[`passenger-${index}-${field}`]) {
      const newErrors = {...validationErrors};
      delete newErrors[`passenger-${index}-${field}`];
      setValidationErrors(newErrors);
    }
  };
  
  // Validate each field
  const validateField = (field: string, value: string, label: string) => {
    const newErrors = {...validationErrors};
    
    if (!value.trim()) {
      newErrors[field] = `${label} is required`;
    } else if (field.includes("age") && (isNaN(Number(value)) || Number(value) <= 0 || Number(value) > 120)) {
      newErrors[field] = "Please enter a valid age";
    } else if (field === "contactEmail" && !value.includes("@")) {
      newErrors[field] = "Please enter a valid email address";
    } else if (field === "contactPhone" && value.length < 10) {
      newErrors[field] = "Please enter a valid phone number";
    } else {
      delete newErrors[field];
    }
    
    setValidationErrors(newErrors);
  };
  
  // Function to handle validation on blur
  const handleBlur = (field: string, value: string, label: string) => {
    validateField(field, value, label);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
          Contact Information
        </h3>
        <p className="text-xs text-blue-600 dark:text-blue-400 mb-4">
          Your booking confirmation and updates will be sent to these contact details.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                className="w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800"
                placeholder="your@email.com"
                value={contactEmail}
                onChange={(e) => onContactInfoChange("contactEmail", e.target.value)}
                onBlur={(e) => handleBlur("contactEmail", e.target.value, "Email")}
                required
              />
            </div>
            {validationErrors["contactEmail"] && (
              <p className="text-red-500 text-xs mt-1">{validationErrors["contactEmail"]}</p>
            )}
          </div>
          
          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="tel"
                className="w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800"
                placeholder="10-digit mobile number"
                value={contactPhone}
                onChange={(e) => onContactInfoChange("contactPhone", e.target.value)}
                onBlur={(e) => handleBlur("contactPhone", e.target.value, "Phone number")}
                required
              />
            </div>
            {validationErrors["contactPhone"] && (
              <p className="text-red-500 text-xs mt-1">{validationErrors["contactPhone"]}</p>
            )}
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Passenger Information</h3>
        
        {passengerDetails.map((passenger, index) => (
          <div 
            key={index}
            className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Passenger {index + 1}</h4>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemovePassenger(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <FaTrash />
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative col-span-1 md:col-span-1">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    className="w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800"
                    placeholder="Enter full name"
                    value={passenger.name}
                    onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
                    onBlur={(e) => handleBlur(`passenger-${index}-name`, e.target.value, "Full name")}
                    required
                  />
                </div>
                {validationErrors[`passenger-${index}-name`] && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors[`passenger-${index}-name`]}</p>
                )}
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Age
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800"
                  placeholder="Enter age"
                  value={passenger.age}
                  onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
                  onBlur={(e) => handleBlur(`passenger-${index}-age`, e.target.value, "Age")}
                  required
                />
                {validationErrors[`passenger-${index}-age`] && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors[`passenger-${index}-age`]}</p>
                )}
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Gender
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800"
                  value={passenger.gender}
                  onChange={(e) => handlePassengerChange(
                    index, 
                    "gender", 
                    e.target.value as "Male" | "Female" | "Other"
                  )}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={handleAddPassenger}
          className="flex items-center mt-4 text-primary-600 hover:text-primary-800 transition-colors"
        >
          <FaPlus className="mr-2" />
          Add Another Passenger
        </button>
      </div>
    </div>
  );
} 