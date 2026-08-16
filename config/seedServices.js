import serviceModel from '../models/serviceModel.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();



const services = [
  { serviceName: "Adult Haircut", price: 160, duration: 30, description: "Regular haircut for adults" },
  { serviceName: "Children Haircut", price: 140, duration: 25, description: "Haircut for children under 12" },
  { serviceName: "Clean Shave", price: 50, duration: 20, description: "Clean shave service" },
  { serviceName: "Shave + Haircut", price: 210, duration: 45, description: "Combo package" }
];

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
    
    await serviceModel.deleteMany({});
    console.log("Cleared existing services");
    
    await serviceModel.insertMany(services);
    console.log("Services seeded successfully");
    
  } catch(error) {
    console.error("Error seeding services:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

seedServices();
