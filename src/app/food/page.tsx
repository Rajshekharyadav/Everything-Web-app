"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaSearch, FaStar, FaHeart, FaRegHeart, FaFilter, FaLocationArrow, FaRegClock } from "react-icons/fa";
import { MdDeliveryDining, MdDining, MdPriceCheck, MdOutlineDiscount } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";

// Mock data for restaurants
const restaurantsData = [
  {
    id: 1,
    name: "The Spice Garden",
    image: "/food/restaurant1.jpg",
    cuisine: ["Indian", "Vegetarian"],
    rating: 4.5,
    reviews: 342,
    price: "$$",
    deliveryTime: "30-40",
    distance: "1.2 km",
    discount: "40% OFF up to $10",
    isPromoted: true,
    isFavorite: false,
  },
  {
    id: 2,
    name: "Pasta Paradise",
    image: "/food/restaurant2.jpg",
    cuisine: ["Italian", "Pizza"],
    rating: 4.2,
    reviews: 215,
    price: "$$$",
    deliveryTime: "25-35",
    distance: "0.8 km",
    discount: "50% OFF up to $15",
    isPromoted: false,
    isFavorite: true,
  },
  {
    id: 3,
    name: "Sushi Master",
    image: "/food/restaurant3.jpg",
    cuisine: ["Japanese", "Sushi"],
    rating: 4.7,
    reviews: 518,
    price: "$$$",
    deliveryTime: "35-45",
    distance: "2.1 km",
    discount: "30% OFF up to $12",
    isPromoted: true,
    isFavorite: false,
  },
  {
    id: 4,
    name: "Burger Boulevard",
    image: "/food/restaurant4.jpg",
    cuisine: ["American", "Fast Food"],
    rating: 4.1,
    reviews: 387,
    price: "$$",
    deliveryTime: "20-30",
    distance: "1.7 km",
    discount: "Buy 1 Get 1 Free",
    isPromoted: false,
    isFavorite: false,
  },
  {
    id: 5,
    name: "Thai Delight",
    image: "/food/restaurant5.jpg",
    cuisine: ["Thai", "Asian"],
    rating: 4.4,
    reviews: 276,
    price: "$$",
    deliveryTime: "40-50",
    distance: "3.2 km",
    discount: "15% OFF on all orders",
    isPromoted: false,
    isFavorite: true,
  },
  {
    id: 6,
    name: "Mediterranean Flavors",
    image: "/food/restaurant6.jpg",
    cuisine: ["Mediterranean", "Greek"],
    rating: 4.6,
    reviews: 195,
    price: "$$$",
    deliveryTime: "35-45",
    distance: "2.5 km",
    discount: "Free delivery",
    isPromoted: true,
    isFavorite: false,
  },
  {
    id: 7,
    name: "Taco Fiesta",
    image: "/food/restaurant7.jpg",
    cuisine: ["Mexican", "Latin American"],
    rating: 4.3,
    reviews: 312,
    price: "$$",
    deliveryTime: "25-35",
    distance: "1.5 km",
    discount: "20% OFF on weekdays",
    isPromoted: false,
    isFavorite: false,
  },
  {
    id: 8,
    name: "Veggie Delights",
    image: "/food/restaurant8.jpg",
    cuisine: ["Vegetarian", "Vegan"],
    rating: 4.5,
    reviews: 168,
    price: "$$",
    deliveryTime: "30-40",
    distance: "1.1 km",
    discount: "25% OFF first order",
    isPromoted: false,
    isFavorite: true,
  },
];

// Mock data for cuisine categories
const cuisineCategories = [
  { id: 1, name: "Pizza", image: "/food/pizza.jpg" },
  { id: 2, name: "Burger", image: "/food/burger.jpg" },
  { id: 3, name: "Sushi", image: "/food/sushi.jpg" },
  { id: 4, name: "Indian", image: "/food/indian.jpg" },
  { id: 5, name: "Italian", image: "/food/italian.jpg" },
  { id: 6, name: "Chinese", image: "/food/chinese.jpg" },
  { id: 7, name: "Mexican", image: "/food/mexican.jpg" },
  { id: 8, name: "Thai", image: "/food/thai.jpg" },
];

export default function FoodPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [restaurants, setRestaurants] = useState(restaurantsData);
  const [filters, setFilters] = useState({
    rating: 0,
    priceRange: [],
    cuisines: [],
    offers: false,
    delivery: false,
    dineIn: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("relevance");

  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    setRestaurants(
      restaurants.map((restaurant) =>
        restaurant.id === id
          ? { ...restaurant, isFavorite: !restaurant.isFavorite }
          : restaurant
      )
    );
  };

  // Filter restaurants based on search, category, and filters
  useEffect(() => {
    let filteredRestaurants = [...restaurantsData];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredRestaurants = filteredRestaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.cuisine.some((c) => c.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (activeCategory) {
      filteredRestaurants = filteredRestaurants.filter((restaurant) =>
        restaurant.cuisine.includes(activeCategory)
      );
    }

    // Apply additional filters
    if (filters.rating > 0) {
      filteredRestaurants = filteredRestaurants.filter(
        (restaurant) => restaurant.rating >= filters.rating
      );
    }

    if (filters.priceRange.length > 0) {
      filteredRestaurants = filteredRestaurants.filter((restaurant) =>
        filters.priceRange.includes(restaurant.price)
      );
    }

    if (filters.cuisines.length > 0) {
      filteredRestaurants = filteredRestaurants.filter((restaurant) =>
        restaurant.cuisine.some((c) => filters.cuisines.includes(c))
      );
    }

    if (filters.offers) {
      filteredRestaurants = filteredRestaurants.filter(
        (restaurant) => restaurant.discount
      );
    }

    // Sort restaurants
    if (sortOption === "rating") {
      filteredRestaurants.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "deliveryTime") {
      filteredRestaurants.sort((a, b) =>
        parseInt(a.deliveryTime.split("-")[0]) - parseInt(b.deliveryTime.split("-")[0])
      );
    } else if (sortOption === "distance") {
      filteredRestaurants.sort((a, b) =>
        parseFloat(a.distance.replace(" km", "")) - parseFloat(b.distance.replace(" km", ""))
      );
    }

    setRestaurants(filteredRestaurants);
  }, [searchQuery, activeCategory, filters, sortOption]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would interact with backend API in a real application
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/food/hero-food.jpg"
            alt="Delicious Food"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Discover the Best Food & Drinks
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-white mb-8"
          >
            Explore top-rated restaurants near you
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-3xl"
          >
            <form 
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row rounded-lg overflow-hidden shadow-lg"
            >
              <div className="flex items-center bg-white dark:bg-gray-800 px-4 flex-1">
                <FaLocationArrow className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Your location"
                  className="w-full py-4 px-2 text-gray-700 dark:text-gray-200 bg-transparent focus:outline-none"
                  defaultValue="New York, NY"
                />
              </div>
              <div className="flex items-center bg-white dark:bg-gray-800 px-4 flex-1 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search for restaurant, cuisine or a dish"
                  className="w-full py-4 px-2 text-gray-700 dark:text-gray-200 bg-transparent focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 md:px-10 font-medium"
              >
                Search
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Popular Cuisines */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular Cuisines</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
            {cuisineCategories.map((cuisine) => (
              <div 
                key={cuisine.id}
                onClick={() => setActiveCategory(activeCategory === cuisine.name ? null : cuisine.name)}
                className={`cursor-pointer group transition-all duration-300 ${
                  activeCategory === cuisine.name 
                    ? 'ring-2 ring-primary-500 scale-105' 
                    : 'hover:scale-105'
                }`}
              >
                <div className="relative h-24 rounded-lg overflow-hidden">
                  <Image
                    src={cuisine.image}
                    alt={cuisine.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white font-medium text-sm">{cuisine.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Filters and Sorting */}
        <section className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FaFilter />
              <span>Filters</span>
            </button>
            
            <div className="hidden md:flex space-x-2">
              <button 
                onClick={() => setFilters({...filters, delivery: !filters.delivery})}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filters.delivery 
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center space-x-1">
                  <MdDeliveryDining />
                  <span>Delivery</span>
                </div>
              </button>
              
              <button 
                onClick={() => setFilters({...filters, dineIn: !filters.dineIn})}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filters.dineIn 
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center space-x-1">
                  <MdDining />
                  <span>Dine In</span>
                </div>
              </button>
              
              <button 
                onClick={() => setFilters({...filters, offers: !filters.offers})}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filters.offers 
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center space-x-1">
                  <BiSolidOffer />
                  <span>Offers</span>
                </div>
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Rating</option>
              <option value="deliveryTime">Delivery Time</option>
              <option value="distance">Distance</option>
            </select>
          </div>
        </section>
        
        {/* Expanded Filters (hidden by default) */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <h3 className="text-md font-medium text-gray-800 dark:text-white mb-3">Price Range</h3>
                <div className="space-y-2">
                  {["$", "$$", "$$$", "$$$$"].map((price) => (
                    <label key={price} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.priceRange.includes(price)}
                        onChange={() => {
                          const newPriceRange = filters.priceRange.includes(price)
                            ? filters.priceRange.filter((p) => p !== price)
                            : [...filters.priceRange, price];
                          setFilters({ ...filters, priceRange: newPriceRange });
                        }}
                        className="rounded text-primary-600 focus:ring-primary-500 dark:bg-gray-700"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{price}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Rating */}
              <div>
                <h3 className="text-md font-medium text-gray-800 dark:text-white mb-3">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 0].map((rating) => (
                    <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => setFilters({ ...filters, rating })}
                        className="text-primary-600 focus:ring-primary-500 dark:bg-gray-700"
                      />
                      <div className="flex items-center">
                        {rating > 0 ? (
                          <>
                            <span className="text-gray-700 dark:text-gray-300">{rating}+ </span>
                            <FaStar className="ml-1 text-yellow-400" size={14} />
                          </>
                        ) : (
                          <span className="text-gray-700 dark:text-gray-300">All Ratings</span>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Cuisines (shortened for simplicity) */}
              <div>
                <h3 className="text-md font-medium text-gray-800 dark:text-white mb-3">Cuisines</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["Indian", "Italian", "Chinese", "Mexican", "Thai", "Japanese"].map((cuisine) => (
                    <label key={cuisine} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.cuisines.includes(cuisine)}
                        onChange={() => {
                          const newCuisines = filters.cuisines.includes(cuisine)
                            ? filters.cuisines.filter((c) => c !== cuisine)
                            : [...filters.cuisines, cuisine];
                          setFilters({ ...filters, cuisines: newCuisines });
                        }}
                        className="rounded text-primary-600 focus:ring-primary-500 dark:bg-gray-700"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{cuisine}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setFilters({
                    rating: 0,
                    priceRange: [],
                    cuisines: [],
                    offers: false,
                    delivery: false,
                    dineIn: false,
                  });
                }}
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-md"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}

        {/* Restaurant Listing */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {activeCategory 
              ? `${activeCategory} Restaurants` 
              : searchQuery 
                ? `Search Results for "${searchQuery}"` 
                : "All Restaurants"}
          </h2>
          
          {restaurants.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No restaurants found. Try different filters or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={restaurant.image}
                      alt={restaurant.name}
                      layout="fill"
                      objectFit="cover"
                    />
                    <button
                      onClick={() => toggleFavorite(restaurant.id)}
                      className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    >
                      {restaurant.isFavorite ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart className="text-gray-500" />
                      )}
                    </button>
                    {restaurant.discount && (
                      <div className="absolute bottom-3 left-3 bg-primary-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                        <MdOutlineDiscount className="mr-1" />
                        {restaurant.discount}
                      </div>
                    )}
                    {restaurant.isPromoted && (
                      <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Promoted
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                        <span className="font-bold">{restaurant.rating}</span>
                        <FaStar className="ml-1 text-yellow-500" size={12} />
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <span>{restaurant.cuisine.join(", ")}</span>
                      <span className="mx-2">•</span>
                      <span>{restaurant.price}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                      <div className="flex items-center mr-4">
                        <FaRegClock className="mr-1" />
                        <span>{restaurant.deliveryTime} min</span>
                      </div>
                      <div className="flex items-center">
                        <FaLocationArrow className="mr-1" />
                        <span>{restaurant.distance}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <Link 
                        href={`/food/restaurant/${restaurant.id}`}
                        className="inline-block w-full text-center py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium rounded-md hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                      >
                        Order Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
        
        {/* Show more restaurants */}
        {restaurants.length > 0 && (
          <div className="mt-8 text-center">
            <button className="px-6 py-3 border border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 rounded-md font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
              Load More Restaurants
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 