import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { TravelBooking } from '@/models/TravelBooking';

export async function POST(request: Request) {
  try {
    const booking: TravelBooking = await request.json();
    
    // Add timestamps
    booking.createdAt = new Date();
    booking.updatedAt = new Date();
    
    const client = await clientPromise;
    const db = client.db('travel_app');
    
    const result = await db.collection('bookings').insertOne(booking);
    
    return NextResponse.json({
      success: true,
      bookingId: result.insertedId,
      message: 'Booking created successfully'
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, message: 'Error creating booking' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'UserId is required' },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db('travel_app');
    
    const bookings = await db
      .collection('bookings')
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching bookings' },
      { status: 500 }
    );
  }
} 