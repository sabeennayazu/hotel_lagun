# Hotel Lagoon - Modern Hotel Booking Website

A full-stack hotel booking website built with Next.js for the frontend and Django REST Framework for the backend. The website features a modern, responsive design with room management, booking capabilities, and contact functionality.

## Features

- **Room Management**
  - View available rooms with details and images
  - Search and filter rooms by type and capacity
  - Check room availability for specific dates
  
- **Booking System**
  - Create, view, and manage bookings
  - Real-time availability checking
  - Booking status tracking (pending/confirmed/cancelled)
  
- **Contact System**
  - Submit inquiries through contact form
  - Message tracking and management

## Tech Stack

### Frontend
- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS
- React components

### Backend
- Django 5.2+
- Django REST Framework
- SQLite (development)
- Pillow for image handling
- CORS support

## Project Structure

```
hotel_lagoon/
├── frontend/              # Next.js frontend
│   ├── src/
│   │   ├── app/          # Next.js app directory
│   │   └── components/   # React components
│   └── public/           # Static assets
│
└── backend/              # Django backend
    ├── api/              # Main Django app
    │   ├── models.py     # Database models
    │   ├── views.py      # ViewSets & API logic
    │   ├── urls.py       # API routing
    │   └── serializers.py# Model serializers
    ├── hotel_backend/    # Django project settings
    └── media/            # Uploaded files

## Frontend Components

### Navbar (`src/components/Navbar.tsx`)
- Responsive navigation bar with mobile menu
- Dark theme design with gray-900 background
- Links to Home, About, Rooms, and Contact sections
- Mobile-friendly hamburger menu

### Hero Section (`src/components/Hero.tsx`)
- Full-screen hero section with background image
- Booking form with:
  - Check-in/Check-out date selectors
  - Guest count (adults/children)
  - Room availability checker
- Light theme with semi-transparent white background
- Subtle shadows and borders for visual hierarchy

### About Section (`src/components/About.tsx`)
- Company information and vision
- Two featured images with hover effects
- Light background with custom styling
- Responsive grid layout

### Footer (`src/components/Footer.tsx`)
- Dark theme design (matching Navbar)
- Newsletter subscription form
- Quick links
- Contact information
- Social media links

## Backend Models

### Room Model (`api/models.py`)
```python
class Room:
    name         # Room name
    type         # Single, Double, Suite, Deluxe
    price        # Room price per night
    capacity     # Maximum number of guests
    description  # Room description
    image        # Room image
    is_available # Availability status
```

### Booking Model (`api/models.py`)
```python
class Booking:
    room            # Foreign key to Room
    first_name      # Guest first name
    last_name       # Guest last name
    email          # Guest email
    phone          # Guest phone number
    check_in       # Check-in date
    check_out      # Check-out date
    adults         # Number of adults
    children       # Number of children
    special_requests# Additional requests
    status         # pending/confirmed/cancelled
```

### Contact Model (`api/models.py`)
```python
class Contact:
    name       # Sender's name
    email      # Sender's email
    subject    # Message subject
    message    # Message content
    is_read    # Message read status
    created_at # Timestamp
```

## API Endpoints

### Rooms
```
GET    /api/rooms/                  # List all rooms
POST   /api/rooms/                  # Create a room
GET    /api/rooms/{id}/            # Get room details
PUT    /api/rooms/{id}/            # Update room
DELETE /api/rooms/{id}/            # Delete room
GET    /api/rooms/available_rooms/  # List available rooms
GET    /api/rooms/{id}/check_availability/  # Check specific room
```

### Bookings
```
GET    /api/bookings/              # List all bookings
POST   /api/bookings/              # Create booking
GET    /api/bookings/{id}/         # Get booking details
PUT    /api/bookings/{id}/         # Update booking
DELETE /api/bookings/{id}/         # Delete booking
POST   /api/bookings/{id}/confirm/ # Confirm booking
POST   /api/bookings/{id}/cancel/  # Cancel booking
```

### Contact
```
GET    /api/contact/               # List messages
POST   /api/contact/               # Submit message
GET    /api/contact/{id}/          # Get message details
POST   /api/contact/{id}/mark_as_read/  # Mark as read
```

## Getting Started

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv .venv
   .\.venv\Scripts\activate  # Windows
   source .venv/bin/activate # Linux/Mac
   ```

3. Install dependencies:
   ```bash
   pip install django djangorestframework django-cors-headers django-filter pillow
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Start development server:
   ```bash
   python manage.py runserver
   ```
   Backend will be available at http://localhost:8000

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Frontend will be available at http://localhost:3000

## API Usage Examples

### Check Room Availability
```javascript
// Example using fetch
const checkAvailability = async (roomId, checkIn, checkOut) => {
  const response = await fetch(
    `http://localhost:8000/api/rooms/${roomId}/check_availability/?check_in=${checkIn}&check_out=${checkOut}`
  );
  const data = await response.json();
  return data.is_available;
};
```

### Create a Booking
```javascript
// Example using fetch
const createBooking = async (bookingData) => {
  const response = await fetch('http://localhost:8000/api/bookings/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData)
  });
  return await response.json();
};
```

### Submit Contact Form
```javascript
// Example using fetch
const submitContact = async (contactData) => {
  const response = await fetch('http://localhost:8000/api/contact/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData)
  });
  return await response.json();
};
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

### Room Endpoints
- `GET /api/rooms/` - List all rooms
- `GET /api/rooms/{id}/` - Get room details
- `GET /api/rooms/{id}/check_availability/` - Check room availability
- `POST /api/rooms/` - Create new room (admin only)
- `PUT /api/rooms/{id}/` - Update room (admin only)
- `DELETE /api/rooms/{id}/` - Delete room (admin only)

### Booking Endpoints
- `POST /api/bookings/` - Create new booking
- `GET /api/bookings/{id}/` - Get booking details
- `POST /api/bookings/{id}/confirm_booking/` - Confirm booking
- `POST /api/bookings/{id}/cancel_booking/` - Cancel booking

### Contact Endpoints
- `POST /api/contact/` - Send contact message
- `GET /api/contact/` - List all messages (admin only)

## Setup Instructions

### Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. Install requirements:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
3. Run migrations:
   ```bash
   python manage.py migrate
   ```
4. Create superuser:
   ```bash
   python manage.py createsuperuser
   ```
5. Run server:
   ```bash
   python manage.py runserver
   ```

## Features
- Responsive design
- Room booking system
- Contact form
- Admin dashboard
- Image upload
- Date validation
- Availability checker
- Dark theme navbar and footer
- Light theme content areas
- Mobile-friendly design

## Technology Stack
- Frontend:
  - Next.js 13+
  - TypeScript
  - Tailwind CSS
  - React Hooks
- Backend:
  - Django 5.0+
  - Django REST Framework
  - SQLite
  - CORS Headers

## Future Enhancements
1. User Authentication
2. Payment Integration
3. Email Notifications
4. Room Reviews
5. Room Filtering
6. Advanced Search
7. Admin Dashboard
8. Booking Management System

## Security Considerations
- CSRF Protection enabled
- CORS Configuration in place
- Input Validation implemented
- Data Sanitization
- Image Upload Validation
- Rate Limiting (TODO)
- SSL/TLS (TODO)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
