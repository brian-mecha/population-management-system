const mongoose = require('mongoose');

const { Schema } = mongoose;

const locationSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  population: {
    female: {
      type: Number,
      min: 0,
      default: 0,
    },
    male: {
      type: Number,
      min: 0,
      default: 0,
    },
    total: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
});

module.exports = mongoose.model('Location', locationSchema);
