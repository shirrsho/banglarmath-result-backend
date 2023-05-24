/*

  Not Used For dynamic entries

*/


import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  id: Number,
  segments: [String],
  types: [String]
})

const AssesmentSchema = new mongoose.Schema({
  type:String,
  segment:String,
  furnishThreshold:Number,
  learnThreshold:Number
})

const ExamIntroSchema = new mongoose.Schema({
  examcode:String,
  examname: String,
  nques: Number,
  tags: [TagSchema]
})

const CriteriaSchema = new mongoose.Schema({
  examcode:String,
  criterias:[AssesmentSchema]
})

export const ExamIntro = mongoose.model('ExamIntro', ExamIntroSchema);
export const Criteria = mongoose.model('Criteria', CriteriaSchema);