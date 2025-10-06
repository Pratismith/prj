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

## Future Enhancements (from user request)

The user has outlined several feature improvements:
- Enhanced search with location dropdown and property type filters
- Fixed close button in search panel
- Improved image gallery with lazy loading and proper aspect ratios
- Responsive property details page
- Homestay booking system with WhatsApp integration
- Availability calendar for property owners
- Performance optimizations and accessibility improvements

These enhancements will be implemented in future iterations.
