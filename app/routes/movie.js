const express = require('express');
const router = express.Router();
const movieController = require("../controllers/movieController");
const appConfig = require("../../config/appConfig");


module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/movie`;

    app.get(`${baseUrl}/get/all/movies`, movieController.getAllMovies);

    app.post(`${baseUrl}/add/movie`, movieController.addMovie )

    app.get(`${baseUrl}/:movieId/detail`, movieController.getSingleMovie )

    app.put(`${baseUrl}/:movieId/edit`, movieController.editMovie )

    app.post(`${baseUrl}/delete`, movieController.deleteMovie )


}
