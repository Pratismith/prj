# RentEase Project Documentation

## Project Overview

RentEase is a full-stack property rental management system built with Node.js, Express, MongoDB, and vanilla JavaScript. The application allows users to browse properties, manage their listings, and handle authentication with JWT tokens.

## Architecture

### Backend (Node.js + Express)
- **Location**: `rentease-backend/`
- **Server**: Express.js running on port 5000
- **Database**: MongoDB (using Mongoose ODM)
- **Authentication**: JWT-based authentication
- **File Upload**: Cloudinary for image storage
- **Email**: Nodemailer with Gmail

### Frontend (Vanilla JS)
- **Location**: `frontend/`
- **Type**: Static HTML/CSS/JavaScript
- **Served by**: Express static middleware from backend
- **API Communication**: Fetch API with relative paths

### Key Components

1. **Authentication System**
   - User signup, login, password recovery
   - JWT token storage in localStorage
   - Protected routes with middleware

2. **Property Management**
   - CRUD operations for properties
   - Image upload to Cloudinary (up to 5 images)
   - User-specific property listings

3. **Search & Filter**
   - Real-time property search
   - Filter by location, type, price

## Environment Configuration

### Required Environment Variables

All environment variables are stored in `rentease-backend/.env`:

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `EMAIL_USER` - Gmail address for sending emails
- `EMAIL_PASS` - Gmail app password
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `PORT` - Server port (default: 5000)

## Recent Changes

### Initial Setup (October 6, 2025)

1. **Unified Server Configuration**
   - Modified `server.js` to serve both frontend and backend
   - Backend binds to `0.0.0.0:5000` for Replit compatibility
   - Frontend files served as static assets
   - API routes prefixed with `/api`

2. **Frontend API Updates**
   - Changed all API calls from `http://localhost:4000` to relative paths (`/api/...`)
   - This ensures compatibility with Replit's proxy environment
   - Updated files: login.js, signup.js, script.js, add-property.js, my-properties.js, property-details-new.js, forget-password.js

3. **Dependency Resolution**
   - Fixed middleware import case sensitivity (`authMiddleware.js` → `authmiddleware.js`)
   - Installed missing packages: `cloudinary`, `multer`, `multer-storage-cloudinary`
   - Used `--legacy-peer-deps` flag for cloudinary version compatibility

4. **Workflow Configuration**
   - Created "RentEase App" workflow
   - Command: `cd rentease-backend && npm start`
   - Serves on port 5000 with webview output

## Project Structure

```
rentease/
├── frontend/              # Static frontend files
│   ├── *.html            # Page templates
│   ├── *.js              # Client-side JavaScript
│   └── *.css             # Stylesheets
├── rentease-backend/     # Backend application
│   ├── config/           # Configuration files
│   ├── middleware/       # Express middleware
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── server.js         # Main server file
│   ├── .env              # Environment variables (not committed)
│   └── package.json      # Dependencies
└── README.md             # User documentation
```

## API Routes

### Public Routes
- `GET /` - Serves frontend home page
- `GET /api/properties` - List all properties
- `GET /api/properties/:id` - Get property details

### Protected Routes (require JWT token)
- `POST /api/signup` - User registration
- `POST /api/login` - User authentication
- `POST /api/forgot-password` - Send password reset OTP
- `POST /api/reset-password` - Reset password with OTP
- `GET /api/properties/my-properties` - Get user's properties
- `POST /api/properties/add-property` - Add new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

## Deployment Configuration

- **Type**: Autoscale deployment
- **Run Command**: `node rentease-backend/server.js`
- **Port**: 5000
- **Output**: Webview (for frontend preview)

## User Preferences

None specified yet.

## Known Issues & Solutions

1. **Case-sensitive imports on Linux**
   - Issue: `authMiddleware.js` vs `authmiddleware.js`
   - Solution: Updated imports to match actual filenames

2. **Cloudinary peer dependency conflict**
   - Issue: Version mismatch between cloudinary v2 and multer-storage-cloudinary
   - Solution: Use `npm install --legacy-peer-deps`

3. **Replit Proxy Compatibility**
   - Issue: Users access via proxy, not localhost directly
   - Solution: Frontend uses relative API paths, server binds to `0.0.0.0`

## Development Workflow

1. Code changes in `rentease-backend/` or `frontend/`
2. Workflow auto-restarts on backend dependency changes
3. Frontend changes require browser refresh
4. Check logs for server errors
5. Use browser DevTools for frontend debugging

## Database Schema

### User Model
- name (String)
- email (String, unique)
- password (String, hashed)

### Property Model
- title (String)
- type (String)
- location (String)
- price (Number)
- deposit (Number)
- description (String)
- beds (Number)
- baths (Number)
- sqFt (Number)
- gender (String)
- furnishing (String)
- phone (String)
- whatsapp (String)
- amenities (Array)
- images (Array of URLs)
- userId (ObjectId, ref: User)
- verified (Boolean)
- availability (String)

## Recent Enhancements (October 6, 2025)

Successfully implemented comprehensive feature improvements:

### Search Enhancements
- Added location dropdown with major Indian cities
- Updated property type filter with options: Any, Apartment, House, Studio, Homestay, PG, Villa
- Fixed close button functionality (added id="closeSearch")
- Added keyboard navigation (ESC to close modal)
- Click outside modal to close
- Improved search filtering logic

### Homepage Improvements
- Fixed price display with proper formatting (₹X,XXX/mo)
- Added lazy loading for property card images
- Improved price badge styling and formatting
- Added proper accessibility labels (aria-label)
- Implemented sessionStorage caching (5-minute cache) for better performance

### Property Details Page
- Complete CSS redesign with modern, responsive layout
- Implemented lazy loading for images with Intersection Observer API
- Fixed image gallery with proper aspect ratios and scrollable design
- Made details box sticky for better UX
- Improved WhatsApp functionality with pre-filled messages
- Added proper formatting for price and deposit
- Enhanced amenity display with icons
- Fully responsive design for all screen sizes
- Added loading placeholders for images

### Homestay Functionality
- Created new "Add Homestay" page (/add-homestay.html)
- Added "Add Homestay" button to navigation
- Homestay-specific fields:
  - Price per night
  - Maximum guests
  - Availability dates (from/to)
  - WhatsApp number for instant booking
  - Specialized amenities (Kitchen, Garden, Swimming Pool, BBQ, etc.)
- Integration with existing property system

### WhatsApp Booking System
- WhatsApp button on property details page
- Pre-filled messages with property title and location
- Dynamic phone number fetching (uses whatsapp or phone field)
- Opens in new tab for better UX

### Availability Management
- Updated Property model with:
  - availability field
  - availabilityDates (from/to)
  - maxGuests field
  - whatsapp field
- Owners can specify availability dates when adding homestays
- Support for seasonal availability

### Performance & Accessibility
- SessionStorage caching for property data (5-minute duration)
- Lazy loading for all images (native + Intersection Observer)
- Keyboard navigation support (ESC key, Tab navigation)
- ARIA labels for buttons and interactive elements
- Responsive breakpoints for mobile, tablet, desktop
- Optimized CSS with reduced reflows
- Print-friendly styles

### Code Quality
- Proper error handling in all JavaScript files
- Form validation for homestay submissions
- Date range validation
- Image upload limits (max 5 images)
- Clean, maintainable code structure
