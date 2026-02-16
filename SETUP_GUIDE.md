# Real Estate MERN Stack - Setup Guide

## Project Status: ✅ Complete Scaffolding

Your MERN stack real estate website has been completely scaffolded and is ready for deployment!

## What's Been Created

✅ **Backend (Node.js/Express)**
- Express server with MongoDB integration
- User authentication with JWT
- Property management API
- RESTful endpoints for properties and users
- Password hashing with bcryptjs
- CORS configuration

✅ **Frontend (React)**
- Home page with featured properties
- Property listings with filters
- Property details page
- Login and registration pages
- Header and footer components
- Responsive CSS styling
- API service layer

✅ **Database Models**
- User model (name, email, password, role, phone)
- Property model (title, description, price, location, amenities, images)
- Authentication middleware

✅ **File Structure**
```
Real_Estate/
├── server/
│   ├── models/       (User.js, Property.js)
│   ├── routes/       (authRoutes.js, propertyRoutes.js)
│   ├── controllers/  (authController.js, propertyController.js)
│   ├── middleware/   (auth.js)
│   ├── config/       (db.js, index.js)
│   ├── server.js
│   ├── package.json
│   └── .env
├── client/
│   ├── src/
│   │   ├── components/ (Header, Footer, PropertyCard)
│   │   ├── pages/      (Home, Listings, Login, Register, PropertyDetails)
│   │   ├── services/   (api.js)
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   └── package.json
└── README.md
```

## Prerequisites

Before running the application, you need to install:

### 1. **Node.js & npm**
   - Download from: https://nodejs.org/ (LTS version)
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

### 2. **MongoDB**
   - **Option A: Local Installation**
     - Download from: https://www.mongodb.com/try/download/community
     - Install and run MongoDB service
   
   - **Option B: MongoDB Atlas (Cloud)**
     - Create account at: https://www.mongodb.com/cloud/atlas
     - Create a free cluster
     - Get connection string

### 3. **Git (Optional, for version control)**
   - Download from: https://git-scm.com/

## Installation Steps

### Step 1: Install Backend Dependencies
```bash
cd server
npm install
```

### Step 2: Install Frontend Dependencies
```bash
cd ../client
npm install
```

### Step 3: Configure Environment Variables

Edit `server/.env` with your MongoDB connection:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/real-estate
JWT_SECRET=your-super-secret-key-at-least-32-characters
JWT_EXPIRE=7d
```

**For MongoDB Atlas**, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/real-estate?retryWrites=true&w=majority
```

## Running the Application

### Terminal 1: Start Backend Server
```bash
cd server
npm run dev    # Uses nodemon for auto-reload
```
Expected output:
```
Server running on port 5000
MongoDB connected successfully
```

### Terminal 2: Start Frontend
```bash
cd client
npm start
```
This opens `http://localhost:3000` in your browser

## Testing the Application

### 1. Create an Account
- Click "Register" on the homepage
- Fill in: Name, Email, Password, Phone (optional)
- Select role: "Buyer" or "Real Estate Agent"

### 2. Login
- Use your registered credentials

### 3. Browse Properties
- Go to "Properties" page
- Use filters: City, Type, Price Range
- Click on any property to see details

### 4. Create Property (Agent Only)
- Login as an agent
- Go to "My Listings"
- Click "Add New Property"
- Fill in property details and submit

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints
```
POST /auth/register
POST /auth/login
GET /auth/me (Protected)
```

### Property Endpoints
```
GET /properties                    (Get all properties with filters)
GET /properties/:id                (Get property details)
POST /properties                   (Create property - Protected)
PUT /properties/:id                (Update property - Protected)
DELETE /properties/:id             (Delete property - Protected)
```

## Query Parameters for Properties
```
GET /properties?city=NewYork&type=apartment&priceMin=100000&priceMax=500000
```

## Common Issues

### 1. MongoDB Connection Error
**Problem**: "MongoDB connection failed"
- Ensure MongoDB service is running
- Check MONGODB_URI in .env file
- For local MongoDB: `mongod --version` should work

### 2. Port Already in Use
**Problem**: "Port 5000 is already in use"
```bash
# Change PORT in server/.env to 5001
# Or kill existing process (Windows):
Get-Process -Name "node" | Stop-Process -Force
```

### 3. CORS Errors
**Problem**: "Access to XMLHttpRequest blocked by CORS"
- This should be handled automatically
- Ensure proxy is set in client/package.json: `"proxy": "http://localhost:5000"`

### 4. Module Not Found
**Problem**: "Cannot find module 'express'"
```bash
# Make sure you're in the correct directory
cd server
npm install
```

### 5. npm command not found
- Ensure Node.js is installed
- Add Node.js to system PATH
- Restart your terminal after installation

## Development Tips

### Hot Reload
- **Backend**: nodemon automatically restarts on file changes
- **Frontend**: React automatically reloads changes in browser

### Browser DevTools
- Use Chrome DevTools to debug React components
- Check Network tab to monitor API calls
- Use console for errors and logs

### Testing API with Postman
1. Download Postman: https://www.postman.com/downloads/
2. Create requests for each endpoint
3. Add Authorization header for protected routes:
   ```
   Authorization: Bearer <your-token>
   ```

## Project Features Explained

### Authentication Flow
1. User registers → Password hashed with bcryptjs
2. User logs in → JWT token generated
3. Token stored in localStorage
4. Token sent with each API request
5. Back-end validates token in middleware

### Property Listing Flow
1. Agent creates property → Stored in MongoDB
2. Property assigned to agent (user ID)
3. All users can view properties
4. Only agent can edit/delete own properties

## Next Steps / Enhancements

Consider adding:
- [ ] Image upload functionality
- [ ] Advanced search filters (radius, date, etc)
- [ ] Property reviews and ratings
- [ ] Favorites/Wishlist system
- [ ] Email notifications
- [ ] Admin dashboard for managing users
- [ ] Payment integration (Stripe)
- [ ] Map integration (Google Maps)
- [ ] Property tour scheduling
- [ ] Analytics dashboard

## Database Sample Data

After running the application, you can manually add test data:

```javascript
// Sample property document
{
  "title": "Modern Downtown Apartment",
  "description": "Beautiful 2-bedroom apartment in the heart of downtown",
  "price": 250000,
  "location": "123 Main Street",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "type": "apartment",
  "bedrooms": 2,
  "bathrooms": 1,
  "area": 1200,
  "amenities": ["Gym", "Pool", "Parking", "Security"],
  "featured": true,
  "status": "available"
}
```

## Support & Resources

- **Node.js Docs**: https://nodejs.org/docs/
- **Express.js**: https://expressjs.com/
- **React**: https://react.dev/
- **MongoDB**: https://docs.mongodb.com/
- **JWT**: https://jwt.io/

## License

MIT License - Feel free to use this for learning and development!

---

**Questions or Issues?** Check the README.md in the project root for more information.
