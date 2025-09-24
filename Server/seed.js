// server/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/user.model.js';
import Service from './models/service.model.js';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

// Step 1: All services
const services = [
  { name: "Electrician", imageUrl: "/serviceImage/electricion.png", category: "Home Maintenance", description: "Expert electrical installations and repairs." },
  { name: "Plumber", imageUrl: "/serviceImage/plumber.png", category: "Home Maintenance", description: "Fixing leaks, pipes, and bathroom fittings efficiently." },
  { name: "AC Repair", imageUrl: "/serviceImage/A.C.png", category: "Appliance Repair", description: "Cooling unit installation and maintenance." },
  { name: "Carpenter", imageUrl: "/serviceImage/carpenter.png", category: "Home Improvement", description: "Woodwork, furniture repair, and custom design." },
  { name: "House Cleaning", imageUrl: "/serviceImage/houseCleaning.png", category: "Cleaning", description: "Deep home cleaning including kitchen, bathrooms, and floors." },
  { name: "Pest Control", imageUrl: "/serviceImage/pestControl.png", category: "Sanitation", description: "Safe and effective pest removal solutions." },
  { name: "CCTV Installation", imageUrl: "/serviceImage/CCTV_Installation.png", category: "Security", description: "Surveillance system setup for home and office." },
  { name: "Gardening", imageUrl: "/serviceImage/gardening.png", category: "Outdoor", description: "Lawn care, plant maintenance, and landscaping." },
  { name: "Painting", imageUrl: "/serviceImage/painting.png", category: "Home Improvement", description: "Interior and exterior painting with premium finishes." }
];

// Step 2: Predefined providers
const providers = [
  {
    name: "Amit Kumar",
    email: "amit@example.com",
    password: "password123",
    imageUrl: "https://randomuser.me/api/portraits/men/10.jpg",
    contact: "+91-9876543210",
    location: "Thane",
    services: [
      { serviceName: "Electrician", price: 1200, availability: "9 AM - 6 PM" },
      { serviceName: "AC Repair", price: 1500, availability: "10 AM - 7 PM" }
    ]
  },
  {
    name: "Sneha Patel",
    email: "sneha@example.com",
    password: "password123",
    imageUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    contact: "+91-9988776655",
    location: "Mumbra",
    services: [
      { serviceName: "Plumber", price: 1000, availability: "10 AM - 5 PM" },
      { serviceName: "House Cleaning", price: 1300, availability: "8 AM - 4 PM" }
    ]
  },
  {
    name: "Ravi Verma",
    email: "ravi@example.com",
    password: "password123",
    imageUrl: "https://randomuser.me/api/portraits/men/15.jpg",
    contact: "+91-9123456780",
    location: "Sion",
    services: [
      { serviceName: "Carpenter", price: 1400, availability: "10 AM - 6 PM" }
    ]
  },
  {
    name: "Pooja Sharma",
    email: "pooja@example.com",
    password: "password123",
    imageUrl: "https://randomuser.me/api/portraits/women/18.jpg",
    contact: "+91-9000001111",
    location: "Kurla",
    services: [
      { serviceName: "Pest Control", price: 1100, availability: "9 AM - 5 PM" },
      { serviceName: "Gardening", price: 1600, availability: "6 AM - 2 PM" }
    ]
  },
  {
    name: "Nikhil Mehta",
    email: "nikhil@example.com",
    password: "password123",
    imageUrl: "https://randomuser.me/api/portraits/men/20.jpg",
    contact: "+91-9555556666",
    location: "Bhiwandi",
    services: [
      { serviceName: "CCTV Installation", price: 1800, availability: "10 AM - 8 PM" }
    ]
  },
  {
    name: "Kiran Joshi",
    email: "kiran@example.com",
    password: "password123",
    imageUrl: "https://randomuser.me/api/portraits/women/25.jpg",
    contact: "+91-9112233445",
    location: "Mulund",
    services: [
      { serviceName: "Painting", price: 2000, availability: "9 AM - 6 PM" }
    ]
  }
];

// Step 3: Seeder function
async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    await User.deleteMany({ role: 'provider' });
    await Service.deleteMany();

    const createdServices = await Service.insertMany(services);
    console.log(`✅ ${createdServices.length} services inserted`);

    const serviceMap = {};
    createdServices.forEach(s => serviceMap[s.name] = s._id);

    for (const provider of providers) {
      const hashedPassword = await bcrypt.hash(provider.password, 10);

      const spDetails = provider.services.map(s => ({
        serviceId: serviceMap[s.serviceName],
        rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
        price: s.price,
        availability: s.availability,
        description: `${provider.name} offers professional ${s.serviceName} services.`
      }));

      await User.create({
        name: provider.name,
        email: provider.email,
        password: provider.password,
        imageUrl: provider.imageUrl,
        contact: provider.contact,
        location: provider.location,
        role: 'provider',
        spDetails
      });
    }

    console.log(`✅ ${providers.length} providers inserted`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding DB:", err);
    process.exit(1);
  }
}

seedDatabase();
