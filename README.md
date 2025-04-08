# Everything Web App

A comprehensive web application for booking and ordering various services including travel, entertainment, food, shopping, and healthcare.

## Features

- User Authentication (Register/Login)
- Travel Booking (Flights, Trains, Buses)
- Entertainment Booking (Movies, Events, Concerts)
- Food Ordering (Restaurants, Groceries, Takeout)
- Shopping (Electronics, Clothing, Home & Living)
- Healthcare Services (Medicines, Appointments, Lab Tests)

## Tech Stack

- Frontend: Next.js 14, TypeScript, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
- State Management: Zustand

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/everything-web-app.git
cd everything-web-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add the following variables:
```
MONGODB_URI=mongodb://localhost:27017/everything-app
JWT_SECRET=your-secret-key-here
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. Start MongoDB:
```bash
# Make sure MongoDB is running on your system
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── (auth)/            # Authentication pages
│   ├── (travel)/          # Travel booking pages
│   ├── (entertainment)/   # Entertainment booking pages
│   ├── (food)/            # Food ordering pages
│   ├── (shopping)/        # Shopping pages
│   └── (healthcare)/      # Healthcare pages
├── components/            # Reusable components
├── lib/                   # Utility functions
├── models/               # Database models
├── store/                # State management
└── types/                # TypeScript type definitions
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Travel
- GET /api/travel/flights - Get available flights
- POST /api/travel/flights/book - Book a flight
- GET /api/travel/trains - Get available trains
- POST /api/travel/trains/book - Book a train
- GET /api/travel/buses - Get available buses
- POST /api/travel/buses/book - Book a bus

### Entertainment
- GET /api/entertainment/movies - Get available movies
- POST /api/entertainment/movies/book - Book movie tickets
- GET /api/entertainment/events - Get available events
- POST /api/entertainment/events/book - Book event tickets

### Food
- GET /api/food/restaurants - Get available restaurants
- POST /api/food/restaurants/order - Place food order
- GET /api/food/groceries - Get available groceries
- POST /api/food/groceries/order - Place grocery order

### Shopping
- GET /api/shopping/products - Get available products
- POST /api/shopping/cart - Add to cart
- POST /api/shopping/checkout - Checkout cart

### Healthcare
- GET /api/healthcare/medicines - Get available medicines
- POST /api/healthcare/medicines/order - Order medicines
- GET /api/healthcare/doctors - Get available doctors
- POST /api/healthcare/appointments/book - Book appointment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
