import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlane, FaTrain, FaBus, FaInfoCircle } from "react-icons/fa";

interface SeatSelectionProps {
  bookingType: string;
  numPassengers: number;
  selectedSeats: string[];
  onSeatSelectionChange: (seats: string[]) => void;
}

export default function SeatSelection({
  bookingType,
  numPassengers,
  selectedSeats,
  onSeatSelectionChange,
}: SeatSelectionProps) {
  const [seatMap, setSeatMap] = useState<{ id: string; status: "available" | "occupied" | "selected" }[]>([]);
  const [selectedClass, setSelectedClass] = useState("economy");
  
  // Generate seat map based on booking type
  useEffect(() => {
    let newSeatMap: { id: string; status: "available" | "occupied" | "selected" }[] = [];
    
    if (bookingType === "flight") {
      // Generate airplane seat layout (6 seats per row, 30 rows)
      for (let row = 1; row <= 30; row++) {
        for (let col of ["A", "B", "C", "D", "E", "F"]) {
          // Randomly mark some seats as occupied
          const status = Math.random() > 0.7 ? "occupied" : "available";
          newSeatMap.push({ id: `${row}${col}`, status });
        }
      }
    } else if (bookingType === "train") {
      // Generate train seat layout (sleeper berths)
      for (let coach = 1; coach <= 10; coach++) {
        for (let berth = 1; berth <= 72; berth++) {
          // Randomly mark some seats as occupied
          const status = Math.random() > 0.7 ? "occupied" : "available";
          newSeatMap.push({ id: `S${coach}-${berth}`, status });
        }
      }
    } else if (bookingType === "bus") {
      // Generate bus seat layout (2-2 seating, 20 rows)
      for (let row = 1; row <= 20; row++) {
        for (let col of ["A", "B", "C", "D"]) {
          // Randomly mark some seats as occupied
          const status = Math.random() > 0.7 ? "occupied" : "available";
          newSeatMap.push({ id: `${row}${col}`, status });
        }
      }
    }
    
    // Mark previously selected seats
    if (selectedSeats.length > 0) {
      newSeatMap = newSeatMap.map(seat => {
        if (selectedSeats.includes(seat.id)) {
          return { ...seat, status: "selected" };
        }
        return seat;
      });
    }
    
    setSeatMap(newSeatMap);
  }, [bookingType]);
  
  // Handle seat click
  const handleSeatClick = (seatId: string) => {
    // Find the seat in the seatMap
    const seatIndex = seatMap.findIndex(seat => seat.id === seatId);
    if (seatIndex === -1 || seatMap[seatIndex].status === "occupied") {
      return; // Seat not found or is occupied
    }
    
    // Check if seat is already selected
    if (seatMap[seatIndex].status === "selected") {
      // Deselect seat
      const updatedSeatMap = [...seatMap];
      updatedSeatMap[seatIndex] = { ...updatedSeatMap[seatIndex], status: "available" };
      setSeatMap(updatedSeatMap);
      
      // Update selected seats
      const updatedSelectedSeats = selectedSeats.filter(seat => seat !== seatId);
      onSeatSelectionChange(updatedSelectedSeats);
    } else {
      // Check if maximum number of seats already selected
      if (selectedSeats.length >= numPassengers) {
        alert(`You can only select ${numPassengers} seat(s) for your booking.`);
        return;
      }
      
      // Select seat
      const updatedSeatMap = [...seatMap];
      updatedSeatMap[seatIndex] = { ...updatedSeatMap[seatIndex], status: "selected" };
      setSeatMap(updatedSeatMap);
      
      // Update selected seats
      onSeatSelectionChange([...selectedSeats, seatId]);
    }
  };
  
  // Filter seats based on selected class (for flights)
  const filteredSeats = () => {
    if (bookingType === "flight") {
      if (selectedClass === "economy") {
        return seatMap.filter(seat => parseInt(seat.id) > 10);
      } else if (selectedClass === "business") {
        return seatMap.filter(seat => parseInt(seat.id) <= 10 && parseInt(seat.id) > 3);
      } else {
        return seatMap.filter(seat => parseInt(seat.id) <= 3);
      }
    }
    return seatMap;
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Selected Seats</h3>
        <div className="flex items-center mb-2">
          <span className="text-gray-600 dark:text-gray-300 mr-2">
            {selectedSeats.length} out of {numPassengers} selected:
          </span>
          {selectedSeats.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map(seat => (
                <div key={seat} className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 px-3 py-1 rounded-full font-medium text-sm">
                  {seat}
                </div>
              ))}
            </div>
          ) : (
            <span className="text-gray-500 italic">No seats selected</span>
          )}
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-sm text-blue-800 dark:text-blue-300 flex items-start">
          <FaInfoCircle className="mt-0.5 mr-2 flex-shrink-0" />
          <p>Please select {numPassengers} seat(s) for your booking. You can change your selection by clicking on a selected seat again.</p>
        </div>
      </div>
      
      {bookingType === "flight" && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Select Class</h3>
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedClass("economy")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedClass === "economy"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Economy
            </button>
            <button
              onClick={() => setSelectedClass("business")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedClass === "business"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Business
            </button>
            <button
              onClick={() => setSelectedClass("first")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedClass === "first"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              First Class
            </button>
          </div>
        </div>
      )}
      
      <div className="seat-map-wrapper">
        <h3 className="text-lg font-medium mb-4">Select Your Seats</h3>
        <div className="flex gap-4 mb-6">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded mr-2"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-primary-500 rounded mr-2"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-400 dark:bg-gray-500 rounded mr-2"></div>
            <span className="text-sm">Occupied</span>
          </div>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto max-h-96">
          {bookingType === "flight" && (
            <>
              <div className="flex justify-center mb-8">
                <div className="bg-gray-300 dark:bg-gray-700 p-2 rounded-lg flex items-center justify-center w-20 h-12">
                  <FaPlane size={20} className="text-gray-600 dark:text-gray-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-6 gap-2">
                {filteredSeats().map((seat, index) => {
                  // Add aisle separator
                  const needsMarginRight = seat.id.endsWith("C");
                  const needsMarginLeft = seat.id.endsWith("D");
                  
                  return (
                    <motion.button
                      key={seat.id}
                      whileHover={{ scale: seat.status !== "occupied" ? 1.1 : 1 }}
                      className={`
                        w-10 h-10 rounded flex items-center justify-center font-medium text-sm
                        ${needsMarginRight ? "mr-4" : ""} 
                        ${needsMarginLeft ? "ml-4" : ""} 
                        ${
                          seat.status === "available" 
                            ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer" 
                            : seat.status === "selected" 
                              ? "bg-primary-500 text-white cursor-pointer" 
                              : "bg-gray-400 dark:bg-gray-500 text-gray-800 dark:text-gray-200 cursor-not-allowed opacity-50"
                        }
                      `}
                      onClick={() => handleSeatClick(seat.id)}
                      disabled={seat.status === "occupied"}
                    >
                      {seat.id}
                    </motion.button>
                  );
                })}
              </div>
            </>
          )}
          
          {bookingType === "train" && (
            <div className="train-layout">
              <div className="flex justify-center mb-8">
                <div className="bg-gray-300 dark:bg-gray-700 p-2 rounded-lg flex items-center justify-center w-28 h-12">
                  <FaTrain size={20} className="text-gray-600 dark:text-gray-400 mr-2" />
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Coach</span>
                </div>
              </div>
              
              {Array.from({ length: 10 }).map((_, coachIndex) => (
                <div key={coachIndex} className="mb-8">
                  <h4 className="text-sm font-medium mb-2">Coach {coachIndex + 1}</h4>
                  <div className="grid grid-cols-6 gap-2">
                    {seatMap
                      .filter(seat => seat.id.startsWith(`S${coachIndex + 1}`))
                      .map((seat) => (
                        <motion.button
                          key={seat.id}
                          whileHover={{ scale: seat.status !== "occupied" ? 1.1 : 1 }}
                          className={`
                            w-12 h-10 rounded flex items-center justify-center font-medium text-xs
                            ${
                              seat.status === "available" 
                                ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer" 
                                : seat.status === "selected" 
                                  ? "bg-primary-500 text-white cursor-pointer" 
                                  : "bg-gray-400 dark:bg-gray-500 text-gray-800 dark:text-gray-200 cursor-not-allowed opacity-50"
                            }
                          `}
                          onClick={() => handleSeatClick(seat.id)}
                          disabled={seat.status === "occupied"}
                        >
                          {seat.id.split('-')[1]}
                        </motion.button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {bookingType === "bus" && (
            <div className="bus-layout">
              <div className="flex justify-center mb-8">
                <div className="bg-gray-300 dark:bg-gray-700 p-2 rounded-lg flex items-center justify-center w-20 h-12">
                  <FaBus size={20} className="text-gray-600 dark:text-gray-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {seatMap.map((seat) => {
                  // Add aisle separator
                  const needsMarginRight = seat.id.endsWith("B");
                  const needsMarginLeft = seat.id.endsWith("C");
                  
                  return (
                    <motion.button
                      key={seat.id}
                      whileHover={{ scale: seat.status !== "occupied" ? 1.1 : 1 }}
                      className={`
                        w-10 h-10 rounded flex items-center justify-center font-medium text-sm
                        ${needsMarginRight ? "mr-4" : ""} 
                        ${needsMarginLeft ? "ml-4" : ""} 
                        ${
                          seat.status === "available" 
                            ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer" 
                            : seat.status === "selected" 
                              ? "bg-primary-500 text-white cursor-pointer" 
                              : "bg-gray-400 dark:bg-gray-500 text-gray-800 dark:text-gray-200 cursor-not-allowed opacity-50"
                        }
                      `}
                      onClick={() => handleSeatClick(seat.id)}
                      disabled={seat.status === "occupied"}
                    >
                      {seat.id}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 