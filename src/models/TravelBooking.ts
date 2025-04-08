import { ObjectId } from 'mongodb';

export interface TravelBooking {
  _id?: ObjectId;
  type: 'flight' | 'train' | 'bus';
  from: string;
  to: string;
  date: string;
  passengers: number;
  class: string;
  // Flight specific
  tripType?: 'one-way' | 'round-trip';
  // Train specific
  quota?: string;
  // Bus specific
  busType?: string;
  price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlightBooking extends TravelBooking {
  type: 'flight';
  tripType: 'one-way' | 'round-trip';
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
}

export interface TrainBooking extends TravelBooking {
  type: 'train';
  quota: string;
  trainName: string;
  trainNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
}

export interface BusBooking extends TravelBooking {
  type: 'bus';
  busType: string;
  operator: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
} 