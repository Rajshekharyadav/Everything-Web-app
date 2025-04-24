'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaPlane, FaTicketAlt, FaUtensils, FaShoppingBag, FaHospital, 
  FaStar, FaSearch, FaChevronRight, FaFilter, FaInfoCircle,
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaUsers, FaClock
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Service categories with detailed information
const serviceCategories = [
  {
    id: 'travel',
    name: 'Travel',
    icon: <FaPlane className="w-12 h-12" />,
    description: 'Book flights, hotels, trains, buses and vacation packages with the best deals. Explore new destinations with expert travel guides.',
    features: [
      'Domestic and international flights',
      'Luxury and budget hotels',
      'Train and bus tickets',
      'Vacation packages',
      'Travel insurance',
      'Travel guides'
    ],
    benefits: [
      'Best price guarantees',
      'Flexible booking options',
      '24/7 customer support',
      'Reward points on every booking',
      'Free cancellation on selected bookings'
    ],
    href: '/travel',
    color: 'from-blue-500 to-purple-600',
    image: '/profile-placeholder.jpg'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: <FaTicketAlt className="w-12 h-12" />,
    description: 'Book tickets for movies, concerts, sports events, theater shows and more. Discover exclusive events in your city.',
    features: [
      'Movie tickets',
      'Live concerts',
      'Sports events',
      'Theater and plays',
      'Comedy shows',
      'Virtual events'
    ],
    benefits: [
      'Exclusive discounts',
      'Seat selection',
      'E-tickets',
      'Calendar of upcoming events',
      'Group booking discounts'
    ],
    href: '/entertainment',
    color: 'from-red-500 to-orange-600',
    image: '/profile-placeholder.jpg'
  },
  {
    id: 'food',
    name: 'Food',
    icon: <FaUtensils className="w-12 h-12" />,
    description: 'Order food from your favorite restaurants. Discover new cuisines, recipe suggestions, and meal planning services.',
    features: [
      'Restaurant delivery',
      'Meal subscriptions',
      'Grocery delivery',
      'Recipe kits',
      'Catering services',
      'Specialty foods'
    ],
    benefits: [
      'Live order tracking',
      'No minimum order value',
      'Contactless delivery',
      'Special offers and discounts',
      'Dedicated customer support'
    ],
    href: '/food',
    color: 'from-green-500 to-teal-600',
    image: '/profile-placeholder.jpg'
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: <FaShoppingBag className="w-12 h-12" />,
    description: 'Shop from a wide range of products including electronics, fashion, home appliances, and more with doorstep delivery.',
    features: [
      'Electronics',
      'Fashion and accessories',
      'Home and furniture',
      'Beauty and personal care',
      'Books and stationery',
      'Sports equipment'
    ],
    benefits: [
      'Free shipping on orders above $50',
      'Easy returns and exchanges',
      'Secure payment options',
      'Product warranty',
      'Flash sales and exclusive offers'
    ],
    href: '/shopping',
    color: 'from-pink-500 to-purple-600',
    image: '/profile-placeholder.jpg'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: <FaHospital className="w-12 h-12" />,
    description: 'Book appointments with doctors, order medicines, schedule lab tests, and access personalized healthcare services.',
    features: [
      'Doctor consultations',
      'Medicine delivery',
      'Lab tests',
      'Health checkups',
      'Mental health services',
      'Chronic disease management'
    ],
    benefits: [
      'Video consultations',
      'Prescription management',
      'Health records',
      'Medication reminders',
      'Follow-up consultations'
    ],
    href: '/healthcare',
    color: 'from-cyan-500 to-blue-600',
    image: '/profile-placeholder.jpg'
  }
];

// Testimonials for services
const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Frequent Traveler',
    content: 'The travel booking service is exceptional! I booked my entire vacation through the app and saved both time and money.',
    rating: 5,
    service: 'Travel'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Music Enthusiast',
    content: 'I love how easy it is to book concert tickets. The selection is amazing and I never miss my favorite artists now!',
    rating: 5,
    service: 'Entertainment'
  },
  {
    id: 3,
    name: 'David Chen',
    role: 'Foodie',
    content: 'The food delivery service is lightning fast, and the restaurants selection is unmatched. My go-to for meal orders!',
    rating: 4,
    service: 'Food'
  },
  {
    id: 4,
    name: 'Emily Wilson',
    role: 'Online Shopper',
    content: 'Shopping through this platform has been a delightful experience. Great deals and super fast delivery!',
    rating: 5,
    service: 'Shopping'
  },
  {
    id: 5,
    name: 'Michael Brown',
    role: 'Healthcare Professional',
    content: 'As a busy professional, the healthcare services have made my life so much easier. Quick appointments and medicine delivery.',
    rating: 5,
    service: 'Healthcare'
  }
];

// FAQ items
const faqItems = [
  {
    question: 'How do I book a service?',
    answer: 'You can book a service by navigating to the specific service page, selecting your requirements, and following the booking process. Each service has a streamlined booking flow tailored to its specific needs.'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept a wide range of payment methods including credit/debit cards, net banking, UPI, digital wallets, and pay later options. All transactions are secure and encrypted.'
  },
  {
    question: 'Can I cancel or reschedule my booking?',
    answer: 'Yes, most services offer flexible cancellation and rescheduling options. The specific policy varies by service type and provider. You can find the cancellation policy on the service details page.'
  },
  {
    question: 'Are there any membership or subscription plans?',
    answer: 'Yes, we offer various membership plans that provide additional benefits like discounts, priority customer support, and exclusive offers. Visit the membership page to learn more.'
  },
  {
    question: 'How can I contact customer support?',
    answer: 'Our customer support is available 24/7. You can reach us through the in-app chat, email at support@everything.com, or call our toll-free number 1-800-EVERYTHING.'
  }
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState('travel');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState(serviceCategories);
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredServices(serviceCategories);
    } else {
      const query = searchQuery.toLowerCase();
      const results = serviceCategories.filter(
        service => 
          service.name.toLowerCase().includes(query) || 
          service.description.toLowerCase().includes(query) ||
          service.features.some(feature => feature.toLowerCase().includes(query))
      );
      setFilteredServices(results);
    }
  }, [searchQuery]);

  // Function to handle service booking or navigation
  const handleServiceAction = (serviceId: string) => {
    // Add transition effect before navigation
    const element = document.getElementById(serviceId);
    if (element) {
      // Add a subtle scale effect before navigating
      element.style.transform = 'scale(0.98)';
      element.style.transition = 'transform 0.3s ease-out';
      
      // Navigate after the animation completes
      setTimeout(() => {
        const serviceUrl = serviceCategories.find(s => s.id === serviceId)?.href || '/';
        window.location.href = serviceUrl;
      }, 300);
    } else {
      // If element not found, navigate immediately
      const serviceUrl = serviceCategories.find(s => s.id === serviceId)?.href || '/';
      window.location.href = serviceUrl;
    }
  };
  
  // Handle Learn More button click
  const handleLearnMore = (serviceId: string) => {
    // Scroll to the service section
    scrollToService(serviceId);
  };
  
  // Handle Book Now button click
  const handleBookNow = (serviceId: string) => {
    // Navigate to the specific service page
    handleServiceAction(serviceId);
  };

  // Scroll to the selected service section
  const scrollToService = (serviceId: string) => {
    const element = document.getElementById(serviceId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveService(serviceId);
    }
  };
  
  // Handle contact form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle contact form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please fill out all fields'
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please enter a valid email address'
      });
      return;
    }
    
    // Simulate API call for form submission
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
      
      // Reset form after successful submission
      setContactForm({
        name: '',
        email: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
    }, 1000);
  };

  // Toggle FAQ expansion
  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Premium Services
          </motion.h1>
          <motion.p 
            className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover a wide range of services tailored to meet your every need
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mx-auto mt-8 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative flex items-center">
              <FaSearch className="absolute left-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 pl-12 pr-4 bg-white dark:bg-gray-800 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </motion.div>
          
          {/* Quick Navigation Tabs */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {serviceCategories.map((service) => (
              <button
                key={service.id}
                onClick={() => scrollToService(service.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeService === service.id
                    ? 'bg-white text-primary-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {service.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <motion.div
                key={service.id}
                id={service.id}
                className="mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                  <div className={`bg-gradient-to-r ${service.color} p-8 text-white`}>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <div className="bg-white/20 p-4 rounded-2xl">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-3">{service.name}</h2>
                        <p className="text-lg mb-4">{service.description}</p>
                        <motion.button 
                          onClick={() => handleServiceAction(service.id)}
                          className="inline-flex items-center bg-white text-primary-600 px-6 py-2 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Explore {service.name}
                          <FaChevronRight className="ml-2" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Features</h3>
                        <ul className="space-y-3">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <span className="inline-flex items-center justify-center w-6 h-6 mr-3 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full">
                                <FaChevronRight className="w-3 h-3" />
                              </span>
                              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Benefits</h3>
                        <ul className="space-y-3">
                          {service.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <span className="inline-flex items-center justify-center w-6 h-6 mr-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                                <FaStar className="w-3 h-3" />
                              </span>
                              <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-center md:justify-end">
                      <div className="flex gap-4">
                        <button 
                          onClick={() => handleLearnMore(service.id)}
                          className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition"
                        >
                          <FaInfoCircle className="mr-2" /> Learn More
                        </button>
                        <motion.button 
                          onClick={() => handleBookNow(service.id)}
                          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Book Now <FaChevronRight className="ml-2" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20">
              <FaSearch className="mx-auto w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No services found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">We couldn't find any services matching your search criteria.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                View All Services
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">What Our Customers Say</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Real experiences from customers who have used our services
            </p>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex flex-col md:flex-row gap-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className={`flex-1 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col transform transition-all duration-300 ${
                      selectedTestimonial === index ? 'scale-105' : 'scale-100'
                    }`}
                    onClick={() => setSelectedTestimonial(index)}
                    whileHover={{ y: -10 }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <div className="bg-primary-100 dark:bg-primary-900 w-12 h-12 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 mr-4">
                          {testimonial.service === 'Travel' && <FaPlane />}
                          {testimonial.service === 'Entertainment' && <FaTicketAlt />}
                          {testimonial.service === 'Food' && <FaUtensils />}
                          {testimonial.service === 'Shopping' && <FaShoppingBag />}
                          {testimonial.service === 'Healthcare' && <FaHospital />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">"{testimonial.content}"</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                            }`} 
                          />
                        ))}
                      </div>
                      <div className="mt-4 text-sm text-primary-600 dark:text-primary-400">
                        Service: {testimonial.service}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Find answers to common questions about our services
            </p>
          </div>
          
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.question}</h3>
                  <span className={`transform transition-transform duration-300 ${expandedFaqs.includes(index) ? 'rotate-180' : ''}`}>
                    <FaChevronRight className="w-4 h-4" />
                  </span>
                </button>
                
                <AnimatePresence>
                  {expandedFaqs.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Need Help With Our Services?</h2>
              <p className="text-xl mb-8">Our customer support team is available 24/7 to assist you with any questions or issues.</p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-primary-800 p-3 rounded-full mr-4">
                    <FaPhoneAlt className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Call Us</p>
                    <p className="text-primary-300">1-800-EVERYTHING</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-primary-800 p-3 rounded-full mr-4">
                    <FaEnvelope className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Email Us</p>
                    <p className="text-primary-300">support@everything.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-primary-800 p-3 rounded-full mr-4">
                    <FaClock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Support Hours</p>
                    <p className="text-primary-300">24/7, 365 days a year</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-800 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
              
              {formStatus.submitted && (
                <div className={`p-4 mb-6 rounded-lg ${formStatus.success ? 'bg-green-700' : 'bg-red-700'}`}>
                  <p>{formStatus.message}</p>
                </div>
              )}
              
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">Your Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-primary-700 rounded-lg border border-primary-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Your Email</label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-primary-700 rounded-lg border border-primary-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    rows={4} 
                    className="w-full p-3 bg-primary-700 rounded-lg border border-primary-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3 bg-white text-primary-900 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 