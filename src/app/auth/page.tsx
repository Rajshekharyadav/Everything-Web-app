"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaTimes, FaCheck, FaGoogle, FaFacebook, FaArrowRight } from "react-icons/fa";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "signin";
  
  const [authMode, setAuthMode] = useState(mode);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Update auth mode when URL parameter changes
  useEffect(() => {
    setAuthMode(mode);
  }, [mode]);
  
  // Password validation
  const validatePassword = (password: string) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    };
    
    return criteria;
  };
  
  const passwordCriteria = validatePassword(formData.password);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (authMode === "signup" && !Object.values(passwordCriteria).every(Boolean)) {
      newErrors.password = "Password does not meet all requirements";
    }
    
    // Signup-specific validations
    if (authMode === "signup") {
      // Validate name
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }
      
      // Validate confirm password
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to register/login the user
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (authMode === "signup") {
        // Redirect to sign in after successful signup
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/auth?mode=signin&registered=true");
        }, 2000);
      } else {
        // Redirect to profile after successful login
        router.push("/profile");
      }
    } catch (error) {
      console.error("Auth error:", error);
      setErrors({ form: `Failed to ${authMode === "signup" ? "create account" : "sign in"}. Please try again.` });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Toggle between sign in and sign up
  const toggleAuthMode = () => {
    const newMode = authMode === "signin" ? "signup" : "signin";
    setAuthMode(newMode);
    // Update URL without reload
    router.push(`/auth?mode=${newMode}`, { scroll: false });
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <motion.h2 
            className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {authMode === "signin" ? "Sign in to your account" : "Create your account"}
          </motion.h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {authMode === "signin" ? "New to our platform? " : "Already have an account? "}
            <button 
              onClick={toggleAuthMode}
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              {authMode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
        
        <motion.div 
          key={authMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10"
        >
          {showSuccess ? (
            <div className="text-center py-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                <FaCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">Registration successful!</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Redirecting you to sign in...
              </p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {errors.form && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaTimes className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700 dark:text-red-300">{errors.form}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Name input (sign up only) */}
              <AnimatePresence>
                {authMode === "signup" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required={authMode === "signup"}
                          className={`block w-full pl-10 pr-3 py-2 border ${
                            errors.name ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'
                          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white sm:text-sm`}
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Email input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      errors.email ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white sm:text-sm`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>
              
              {/* Password input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={authMode === "signup" ? "new-password" : "current-password"}
                    required
                    className={`block w-full pl-10 pr-10 py-2 border ${
                      errors.password ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white sm:text-sm`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <FaEye className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                )}
                
                {/* Password strength indicator (sign up only) */}
                <AnimatePresence>
                  {authMode === "signup" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-2"
                    >
                      <p className="text-xs text-gray-600 dark:text-gray-400">Password must:</p>
                      <ul className="space-y-1 text-xs">
                        <li className="flex items-center">
                          {passwordCriteria.length ? (
                            <FaCheck className="h-3 w-3 text-green-500 mr-2" />
                          ) : (
                            <FaTimes className="h-3 w-3 text-red-500 mr-2" />
                          )}
                          <span className={passwordCriteria.length ? "text-green-700 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                            Be at least 8 characters long
                          </span>
                        </li>
                        <li className="flex items-center">
                          {passwordCriteria.uppercase ? (
                            <FaCheck className="h-3 w-3 text-green-500 mr-2" />
                          ) : (
                            <FaTimes className="h-3 w-3 text-red-500 mr-2" />
                          )}
                          <span className={passwordCriteria.uppercase ? "text-green-700 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                            Contain at least one uppercase letter
                          </span>
                        </li>
                        <li className="flex items-center">
                          {passwordCriteria.lowercase ? (
                            <FaCheck className="h-3 w-3 text-green-500 mr-2" />
                          ) : (
                            <FaTimes className="h-3 w-3 text-red-500 mr-2" />
                          )}
                          <span className={passwordCriteria.lowercase ? "text-green-700 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                            Contain at least one lowercase letter
                          </span>
                        </li>
                        <li className="flex items-center">
                          {passwordCriteria.number ? (
                            <FaCheck className="h-3 w-3 text-green-500 mr-2" />
                          ) : (
                            <FaTimes className="h-3 w-3 text-red-500 mr-2" />
                          )}
                          <span className={passwordCriteria.number ? "text-green-700 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                            Contain at least one number
                          </span>
                        </li>
                        <li className="flex items-center">
                          {passwordCriteria.special ? (
                            <FaCheck className="h-3 w-3 text-green-500 mr-2" />
                          ) : (
                            <FaTimes className="h-3 w-3 text-red-500 mr-2" />
                          )}
                          <span className={passwordCriteria.special ? "text-green-700 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}>
                            Contain at least one special character
                          </span>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Confirm Password input (sign up only) */}
              <AnimatePresence>
                {authMode === "signup" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Confirm Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          required={authMode === "signup"}
                          className={`block w-full pl-10 pr-10 py-2 border ${
                            errors.confirmPassword ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'
                          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white sm:text-sm`}
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                          >
                            {showConfirmPassword ? (
                              <FaEyeSlash className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <FaEye className="h-5 w-5" aria-hidden="true" />
                            )}
                          </button>
                        </div>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Remember me / Forgot password (sign in only) */}
              <AnimatePresence>
                {authMode === "signin" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <input
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label
                        htmlFor="rememberMe"
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                    
                    <div className="text-sm">
                      <Link
                        href="/auth?mode=forgot-password"
                        className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isLoading 
                      ? 'bg-primary-400 cursor-not-allowed' 
                      : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {authMode === "signin" ? 'Signing in...' : 'Creating account...'}
                    </>
                  ) : (
                    <>
                      {authMode === "signin" ? 'Sign in' : 'Sign up'}
                      <FaArrowRight className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
          
          {/* Social auth section */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <svg className="h-5 w-5 text-[#4285F4]" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                  <span className="ml-2">Google</span>
                </button>
              </div>
              
              <div>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <svg className="h-5 w-5 text-[#1877F2]" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2">Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 