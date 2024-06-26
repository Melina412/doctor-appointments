import multer from 'multer';
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const upload = multer({ storage: new multer.memoryStorage() });

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log('✅ mongoDB connected');
  } catch (error) {
    console.log('mongoDB connection error: ', error.message);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('mongoDB disconnected!');
});
