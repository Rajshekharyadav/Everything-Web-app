"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';

export default function BookingRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('id');

  useEffect(() => {
    // Redirect to the booking ID page after a brief delay
    const timer = setTimeout(() => {
      if (bookingId) {
        router.push(`/booking/${bookingId}`);
      } else {
        router.push('/travel');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [bookingId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center p-8">
        <div className="inline-block animate-spin mb-6">
          <FaSpinner className="w-12 h-12 text-primary-500" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Processing Your Booking
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Please wait while we redirect you to your booking details...
        </p>
      </div>
    </div>
  );
} 