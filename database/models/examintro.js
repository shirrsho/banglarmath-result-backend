/*

  Not Used For dynamic entries

*/


import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  id: Number,
  segments: [String],
  types: [String]
})

const ExamIntroSchema = new mongoose.Schema({
  examcode:String,
  examname: String,
  nques: Number,
  tags: [TagSchema]
})

export const ExamIntro = mongoose.model('ExamIntro', ExamIntroSchema);