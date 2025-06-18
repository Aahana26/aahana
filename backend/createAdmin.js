// createAdmin.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config(); // Load .env

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const username = 'admin12'; // change this if needed
    const password = 'yourPasswordHere'; // choose your password

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists!');
      return mongoose.disconnect();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log('✅ Admin created successfully!');

    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error creating admin:', err);
    mongoose.disconnect();
  }
};

createAdmin();
