// db.js
import mongoose from "mongoose";
// import { ExamInfo } from './models/examinfo.js'

let ExamSchema = new mongoose.Schema({}, { strict: false });
const ExamInfo = mongoose.model('ExamInfo', ExamSchema);

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://hasnain-shirsho:ma8JEqEjGGZGIDpq@banglarmath-result.x7k4hk2.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

export const saveData = async (data) => {
    try {
      data._id = data.examcode+data.examname
      await ExamInfo.create(data);
      console.log('Data saved');
    } catch (error) {
      console.error('Failed to save data', error);
    }
  };
  
  export const getData = async (id) => {
    try {
      const result = await ExamInfo.findById(id);
      return result;
    } catch (error) {
      console.error('Failed to fetch data', error);
      return [];
    }
  };
