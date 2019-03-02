'use strict';
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
 
let actorsSchema = new Schema({
    actorId : {
        type: String,
        unique: true,
        index: true,
        default: ''
    },
    actorName: {
        type: String,
        default:''
    }

});


mongoose.model('Actor', actorsSchema);