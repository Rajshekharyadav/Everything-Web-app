'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaPlane, FaTicketAlt, FaUtensils, FaShoppingBag, FaHospital, 
  FaStar, FaQuoteLeft, FaArrowRight, FaChevronRight, FaWrench, 
  FaBroom, FaFan, FaCar, FaCarSide, FaTools, FaUserMd, 
  FaHeartbeat, FaRunning, FaGraduationCap, FaLanguage, FaCode, 
  FaBalanceScale, FaCamera, FaCalendarAlt 
} from 'react-icons/fa';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const services = [
  {
    name: 'Travel',
    icon: <FaPlane className="w-8 h-8" />,
    description: 'Book flights, hotels, and vacation packages',
    href: '/travel',
  },
  {
    name: 'Entertainment',
    icon: <FaTicketAlt className="w-8 h-8" />,
    description: 'Get tickets for movies, concerts, and events',
    href: '/entertainment',
  },
  {
    name: 'Food',
    icon: <FaUtensils className="w-8 h-8" />,
    description: 'Order food from your favorite restaurants',
    href: '/food',
  },
  {
    name: 'Shopping',
    icon: <FaShoppingBag className="w-8 h-8" />,
    description: 'Shop from a wide range of products',
    href: '/shopping',
  },
  {
    name: 'Healthcare',
    icon: <FaHospital className="w-8 h-8" />,
    description: 'Book appointments with healthcare providers',
    href: '/healthcare',
  },
];

const testimonials = [
  {
    name: 'John Doe',
    role: 'Frequent Traveler',
    content: 'Everything has made my life so much easier. I can book everything in one place!',
    rating: 5,
  },
  {
    name: 'Jane Smith',
    role: 'Food Enthusiast',
    content: 'The food ordering experience is seamless. I love the variety of restaurants available.',
    rating: 5,
  },
  {
    name: 'Mike Johnson',
    role: 'Event Planner',
    content: 'Booking tickets for events has never been this simple. Great service!',
    rating: 5,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3 }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600"
          style={{ y, opacity }}
        />
        <motion.div 
          className="absolute inset-0 bg-black opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your One-Stop Destination for Everything
          </motion.h1>
          <motion.p 
            className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Book travel, entertainment, food, shopping, and healthcare services all in one place
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/services"
              className="inline-flex items-center bg-white text-primary-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              Explore Services
              <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">Why Choose Everything?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We provide a seamless experience for all your booking and shopping needs
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: 'Easy Booking',
                description: 'Simple and intuitive booking process for all services',
                icon: '🎯'
              },
              {
                title: 'Secure Payments',
                description: 'Safe and secure payment options for all transactions',
                icon: '🔒'
              },
              {
                title: '24/7 Support',
                description: 'Round-the-clock customer support for all your needs',
                icon: '💬'
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={hoverScale}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <motion.div 
                  className="text-4xl mb-4"
                  animate={pulseAnimation}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background elements */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 opacity-30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
        
        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-300 dark:bg-primary-800 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-300 dark:bg-secondary-800 rounded-full opacity-10 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block mb-2 px-4 py-1 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 rounded-full"
            >
              <motion.span 
                className="text-sm font-semibold text-primary-600 dark:text-primary-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                WHAT WE OFFER
              </motion.span>
            </motion.div>
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
              Our Premium Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Discover a wide range of services tailored to elevate your experience
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -8 }}
                whileTap={{ scale: 0.98 }}
                className="group relative"
              >
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 dark:from-primary-500/20 dark:to-secondary-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500 -z-10" />
                
                <Link
                  href={service.href}
                  className="block bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  {/* Top right corner decorative element */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-bl-full opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Icon container with glow effect */}
                  <div className="relative mb-8">
                    <motion.div 
                      className="relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-lg shadow-lg group-hover:shadow-primary-500/30 dark:group-hover:shadow-primary-400/30 transition-all duration-300"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      {service.icon}
                    </motion.div>
                    <div className="absolute inset-0 bg-primary-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-lg" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Animated button with gradient */}
                  <motion.div
                    className="flex items-center text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 mt-auto"
                    initial={{ opacity: 0.7, x: -5 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm font-semibold mr-2 relative overflow-hidden">
                      Learn More
                      <motion.span 
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                    <FaChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <Link
              href="/services"
              className="relative inline-flex items-center bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 group shadow-lg hover:shadow-xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                View All Services
                <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500"
                initial={{ x: '100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.4 }}
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">What Our Customers Say</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hear from our satisfied customers about their experiences
            </p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl mx-auto"
              >
                <FaQuoteLeft className="text-primary-600 dark:text-primary-400 text-4xl mb-4" />
                <p className="text-lg mb-6">{testimonials[activeTestimonial].content}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{testimonials[activeTestimonial].role}</p>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <FaStar key={i} className="w-5 h-5" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 space-x-4">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-3 h-3 rounded-full ${
                    activeTestimonial === index ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Everything for their booking needs
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/signup"
                className="inline-flex items-center bg-white text-primary-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                Sign Up Now
                <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
