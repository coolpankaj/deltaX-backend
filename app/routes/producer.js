const express = require('express');
const router = express.Router();
const producerController = require("../controllers/producerController");
const appConfig = require("../../config/appConfig");


module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/producer`;

    app.get(`${baseUrl}/get/all/producer`, producerController.getAllProducers);

    app.post(`${baseUrl}/add/producer`, producerController.addProducer )


}


