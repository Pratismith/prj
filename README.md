# RentEase - Property Rental Management System

A full-stack property rental application with user authentication, property listings, and real-time search functionality.

## ⚠️ IMPORTANT SECURITY NOTICE

**The credentials provided during setup may have been exposed. For production use, you MUST:**

1. **Rotate ALL credentials immediately:**
   - Create a new MongoDB database user with a new password
   - Generate a new, strong JWT secret
   - Create new Gmail app password
   - Regenerate Cloudinary API keys

2. **Never commit `.env` files to version control**
   - The `.env` file is in `.gitignore` to prevent accidental commits
   - Always use environment variables or secure secret management systems
   - For Replit: use the Secrets tab in the Tools panel

3. **For production deployment:**
   - Use Replit Secrets or your platform's environment variable system
   - Enable 2FA on all external services
   - Regularly rotate credentials
   - Monitor access logs for suspicious activity

## Features

- User authentication (signup, login, password recovery)
- Property listing and management
- Image upload with Cloudinary integration
- Advanced property search and filtering
- Responsive design
- User dashboard for managing properties

## Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript
- Vanilla JS (no framework)

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Cloudinary for image storage
- Nodemailer for email services

## Step-by-Step Setup Guide

### Prerequisites

- Node.js (v18 or higher)
- MongoDB database (MongoDB Atlas recommended)
- Cloudinary account (for image uploads)
- Gmail account (for email notifications)

### Installation Steps

#### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd <project-directory>
```

#### Step 2: Install Dependencies

```bash
cd rentease-backend
npm install
```

**Note:** If you encounter peer dependency conflicts with `multer-storage-cloudinary`, run:
```bash
npm install --legacy-peer-deps
```

#### Step 3: Set Up Environment Variables

Create a `.env` file in the `rentease-backend` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_for_jwt
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

##### How to Get These Values:

**MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" and choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password

**JWT Secret:**
- Any random string (e.g., `supersecretkey123`)
- For production, use a strong random string

**Email Credentials:**
1. Use a Gmail account
2. Enable 2-factor authentication
3. Generate an "App Password" from Google Account settings
4. Use the 16-character app password (not your Gmail password)

**Cloudinary Credentials:**
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret

#### Step 4: Run the Application

```bash
cd rentease-backend
npm start
```

The application will start on `http://localhost:5000`

#### Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:5000
```

## Common Errors and Solutions

### Error 1: "Cannot find module 'cloudinary'"

**Problem:** Missing dependencies

**Solution:**
```bash
cd rentease-backend
npm install cloudinary multer multer-storage-cloudinary --legacy-peer-deps
```

### Error 2: "MongooseServerSelectionError: connect ECONNREFUSED"

**Problem:** Cannot connect to MongoDB

**Solutions:**
1. Check if `MONGO_URI` in `.env` is correct
2. Ensure your IP is whitelisted in MongoDB Atlas (Network Access)
3. Verify database user credentials are correct
4. Check if MongoDB service is running (for local MongoDB)

### Error 3: "JsonWebTokenError: jwt malformed"

**Problem:** Invalid or missing JWT token

**Solutions:**
1. Clear browser localStorage
2. Log out and log in again
3. Check if `JWT_SECRET` is set in `.env`

### Error 4: "Email not sent" or "Error sending OTP"

**Problem:** Email configuration issue

**Solutions:**
1. Verify `EMAIL_USER` and `EMAIL_PASS` in `.env`
2. Ensure you're using Gmail App Password (not regular password)
3. Enable "Less secure app access" if using regular Gmail password (not recommended)
4. Check Gmail account has 2FA enabled and app password generated

### Error 5: "Cloudinary upload failed"

**Problem:** Image upload not working

**Solutions:**
1. Verify Cloudinary credentials in `.env`
2. Check if image size is within limits (default 10MB)
3. Ensure internet connection is stable
4. Verify Cloudinary account is active

### Error 6: Port already in use

**Problem:** Port 5000 is occupied by another process

**Solutions:**
1. Stop the other process using port 5000
2. Or change the port in `.env`:
   ```env
   PORT=4000
   ```

### Error 7: "Cannot GET /" or blank page

**Problem:** Frontend files not being served

**Solutions:**
1. Verify the `frontend` folder exists in the project root
2. Check `server.js` has the static file serving middleware
3. Clear browser cache and hard reload (Ctrl+Shift+R)

### Error 8: CORS errors in browser console

**Problem:** Cross-origin requests blocked

**Solutions:**
1. Ensure the server has CORS enabled (already configured in this project)
2. Check if frontend is accessing correct API URLs
3. Verify backend server is running

## Project Structure

```
rentease/
├── backend/                    # Empty (legacy)
├── frontend/                   # Frontend files
│   ├── home.html              # Home page
│   ├── login.html             # Login page
│   ├── signup.html            # Signup page
│   ├── add-property.html      # Add property form
│   ├── my-properties.html     # User's properties
│   ├── property-details.html # Property details view
│   ├── forget-password.html   # Password recovery
│   ├── *.js                   # Frontend JavaScript
│   └── *.css                  # Styles
├── rentease-backend/          # Backend application
│   ├── config/                # Configuration files
│   │   └── cloudinary.js      # Cloudinary setup
│   ├── middleware/            # Express middleware
│   │   ├── authmiddleware.js  # JWT authentication
│   │   └── upload.js          # File upload handling
│   ├── models/                # MongoDB models
│   │   ├── User.js            # User schema
│   │   └── Property.js        # Property schema
│   ├── routes/                # API routes
│   │   ├── auth.js            # Authentication routes
│   │   └── property.js        # Property routes
│   ├── server.js              # Main server file
│   ├── package.json           # Dependencies
│   └── .env                   # Environment variables
└── README.md                  # This file
```

## API Endpoints

### Authentication
- `POST /api/signup` - Create new user account
- `POST /api/login` - User login
- `POST /api/forgot-password` - Request password reset OTP
- `POST /api/reset-password` - Reset password with OTP

### Properties
- `GET /api/properties` - Get all properties (public)
- `GET /api/properties/:id` - Get single property
- `GET /api/properties/my-properties` - Get user's properties (protected)
- `POST /api/properties/add-property` - Add new property (protected)
- `PUT /api/properties/:id` - Update property (protected)
- `DELETE /api/properties/:id` - Delete property (protected)

## Development

To run in development mode with auto-reload:

```bash
cd rentease-backend
npm run dev
```

This uses `nodemon` to automatically restart the server when files change.

## Deployment

This application is configured for deployment on platforms like Replit, Heroku, or Vercel.

### Environment Variables for Production

Ensure all environment variables are set in your deployment platform:
- `MONGO_URI`
- `JWT_SECRET`
- `EMAIL_USER`
- `EMAIL_PASS`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Security Notes

1. Never commit `.env` file to version control
2. Use strong JWT secrets in production
3. Enable MongoDB authentication and IP whitelisting
4. Use HTTPS in production
5. Implement rate limiting for API endpoints
6. Validate and sanitize all user inputs
7. Use Gmail App Passwords instead of regular passwords

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Troubleshooting Tips

1. **Clear Browser Cache**: Press Ctrl+Shift+Del and clear cache
2. **Check Console Logs**: Open browser DevTools (F12) and check for errors
3. **Verify Server Logs**: Check terminal for backend errors
4. **Test API Endpoints**: Use Postman or curl to test API directly
5. **Check Database**: Verify data in MongoDB Atlas/Compass
6. **Network Issues**: Ensure stable internet connection for cloud services

## Support

For issues and questions:
1. Check this README for common errors
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check server and browser console logs

## License

This project is for educational purposes.
