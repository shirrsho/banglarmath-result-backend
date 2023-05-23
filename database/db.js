// db.js
import mongoose from "mongoose";
import { ExamIntro } from "./models/examintro.js";

let ResultsheetSchema = new mongoose.Schema({}, { strict: false });
const Resultsheet = mongoose.model('Resultsheet', ResultsheetSchema);

let CriteriaSchema = new mongoose.Schema({}, { strict: false });
const Criteria = mongoose.model('Criteria', CriteriaSchema);

function convertToSize12(str) {
  let hash = 0;
  if (str.length === 0) {
    return hash.toString().padStart(12, '0');
  }
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    hash = (hash << 5) - hash + charCode;
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString().padStart(12, '0');
}

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://hasnain-shirsho:ma8JEqEjGGZGIDpq@banglarmath-result.x7k4hk2.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (errors) {
    console.error('Failed to connect to MongoDB', errors.reason);
  }
};

export const saveExamIntroData = async (data) => {
    try {
      data._id = convertToSize12(data.examcode)
      await ExamIntro.create(data);
      console.log('Data saved');
    } catch (errors) {
      console.error('Failed to save data', errors.reason);
    }
  };

  const saveEachStudentsResultsheetData = async (examcode, data) => {
    try {
      data._id = convertToSize12(examcode+data.Id);
      await Resultsheet.create(data);
      console.log('Data saved');
    } catch (errors) {
      console.error('Failed to save data', errors.reason);
    }
  };

  export const saveResultsheetData = async (examcode, data) => {
    try {
      data.forEach(async element => {
        await saveEachStudentsResultsheetData(examcode, element)
      });
    } catch (error) {
      console.error('Failed to save data', error);
    }
  };

  const saveEachQuestionsCriteriaData = async (examcode, data) => {
    try {
      data._id = convertToSize12(examcode);
      await Criteria.create(data);
      console.log('Criteria saved');
    } catch (errors) {
      console.error('Failed to save criteria', errors.reason);
    }
  };

  export const saveCriteriaData = async (data) => {
    try {
      data.criterias.forEach(async element => {
        await saveEachQuestionsCriteriaData(data.examcode, element)
      });
    } catch (error) {
      console.error('Failed to save data', error);
    }
  };
  
  export const getResultsheetData = async (examcode, student_id) => {
    try {
      return await Resultsheet.findById(convertToSize12(examcode+student_id));
      // console.log(result);
    } catch (error) {
      console.error('Failed to fetch data', error);
      return [];
    }
  };

  export const getExamintroData = async (examcode) => {
    try {
      return await ExamIntro.findById(convertToSize12(examcode));
      // console.log(result);
    } catch (error) {
      console.error('Failed to fetch data', error);
      return [];
    }
  }

    export const getAllExamintroData = async () => {
      try {
        return await ExamIntro.find();
        // console.log(result);
      } catch (error) {
        console.error('Failed to fetch data', error);
        return [];
      }
  };