'use strict';
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let producerSchema = new Schema({


    producerId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    producerName: {
        type: String,
        default: ''
    }



});


mongoose.model('Producer', producerSchema);