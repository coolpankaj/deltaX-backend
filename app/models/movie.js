'use strict';
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let movieSchema = new Schema({
  movieId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  movieName: {
    type: String,
    default: ''
  },
  yearOfRelease: {
      type: Number,
      default: ''
  },
  producerName: {
      type: String,
      default: ''
  },
  // actors: {
  //    type: String
  // }
  actors: [{
    type: Object
  }]
  
  
  
});


mongoose.model('Movie', movieSchema);
