const express = require('express');
const router = express.Router();
const actorController = require("../controllers/actorController");
const appConfig = require("../../config/appConfig");


module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/actor`;

    app.get(`${baseUrl}/get/all/actors`, actorController.getAllActors);

    app.post(`${baseUrl}/add/actor`, actorController.addActor )


}


