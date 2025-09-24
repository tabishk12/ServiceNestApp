import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import serviceRoutes from './routes/service.routes.js';
import addressRoutes from './routes/address.routes.js';
import bookingRoutes from './routes/booking.route.js';
import userRoute from './routes/users.routes.js';
import notificationRoute from './routes/notification.routes.js';
// Initialize env variables
dotenv.config();

// App config
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials:true               
}));
app.use(express.json()); 
app.use(cookieParser());
// Routes
app.use('/api', serviceRoutes);
app.use('/address', addressRoutes);
app.use('/booking',bookingRoutes)
app.use('/users', userRoute);
app.use('/notifications', notificationRoute);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('✅ MongoDB connected');
  // Start server only after DB connects
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error('❌ MongoDB connection failed:', error.message);
});
