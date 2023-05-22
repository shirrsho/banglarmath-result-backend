/*

  Not Used For dynamic entries

*/


import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  Id: String,
  Name: String,
  School: String,
  Medium: String,
  Class: Number,
})

const TagSchema = new mongoose.Schema({
  id: Number,
  segments: [String],
  types: [String]
})

const ExamSchema = new mongoose.Schema({
  examcode: String,
  examname: String,
  nqes: Number,
  resultsheet:[ResultSchema],
  tags:[TagSchema]

});

export const ExamInfo = mongoose.model('ExamInfo', ExamSchema);