const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib');


/* Models */
const MovieModel = mongoose.model('Movie');

let getAllMovies = (req, res) => {
    MovieModel.find()
    .select('-__v -_id')
    .lean()
    .exec((err, result) => {
        if(err) {
            logger.error(err.message, 'movieController: getAllMovies', 10);
            let apiresponse = response.generate(true, 'Failed to find movie details', 500, null);
            res.send(apiresponse);
        } else if (check.isEmpty(result)) {
            logger.info('No Movie Found', 'Movie Controller: getAllMovies');
            let apiResponse = response.generate(true, 'No Movie Found', 404, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, 'All movies listed', 200, result);
            res.send(apiResponse);
        }
    });

};

let addMovie = (req, res) => {

    let validateIUserInput = (req) => {
        return new Promise((resolve, reject) => {
            if(req.body.movieName && req.body.yearOfRelease && req.body.producerName && req.body.actors) {
                resolve(req);
            } else {
                logger.error(true, 'Field is missing during creation', 'movieController: validateUSerInut', 5);
                let apiResponse = response.generate(true, 'One or more parameters is missing', 400, null);
                reject(apiResponse);
            }
        });
    };

    let insertMovie = (req) => {
        return new Promise((resolve, reject) => {
           console.log('xxxx',req.body);
           console.log('type',typeof(req.body.actors));
            let newMovie = new MovieModel({
                movieId: shortid.generate(),
                movieName: req.body.movieName,
                yearOfRelease: req.body.yearOfRelease,
                producerName: req.body.producerName,
                actors:req.body.actors

             });

             //ruk m krta hu
            /*  let split_actors = req.body.actors.split(',');
             console.log('split_actors', split_actors);
             for(let i = 0; i< split_actors.length; i++){
                 newMovie.actors.push(split_actors[i]);
             }  */

            newMovie.save((err, result) => {
                if(err) {
                    logger.error(err.message, 'moviesController: createMovie', 10);
                    //ye error araha hai kya har bar?
                    //nhi dekh m dikhata hu
                    let apiResponse = response.generate(true, 'failed to insert movie', 500, null);
                    reject(apiResponse);
                } else {
                    let resultObj = result.toObject();
                    resolve(resultObj);
                }
            });
        });

    };

    validateIUserInput(req, res)
        .then(insertMovie)
        .then((resultObj) => {

            delete resultObj._id;
            delete resultObj.__v;
            let apiResponse = response.generate(false, 'movie added', 200, resultObj );
            res.send(apiResponse);
        })
        .catch((err) => {
            res.send(err);
        });

};

let getSingleMovie = (req, res) => {
    MovieModel.findOne({ 'movieId': req.params.movieId })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, 'Movie Controller: getSingleMovie', 10);
                let apiResponse = response.generate(true, 'Failed To Find Movie Details', 500, null);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.info('No Movie Found', 'Movie Controller:getSingleMovie');
                let apiResponse = response.generate(true, 'No Movie Found', 404, null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, 'Movie Details Found', 200, result);
                res.send(apiResponse);
            }
        });
};

let editMovie = (req, res) => {
    let options = req.body;
    MovieModel.update({ 'movieId': req.params.movieId }, options )
    .select('-__v -_id')
    .lean()
    .exec((err, result) => {
        if(err) {
            logger.error(err.message, 'Movie Controller: editMovie', 10);
            let apiResponse = response.generate(true, 'Failed To Find Movie Details', 500, null);
            res.send(apiResponse);
        }  else if (check.isEmpty(result)) {
            logger.info('No Movie Found', 'movie Controller: editmovie');
            let apiResponse = response.generate(true, 'No Movie Found', 404, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, 'Movie details Updated', 200, null);
            res.send(apiResponse);
        }
    });
};

let deleteMovie = (req, res) => {
    MovieModel.findOneAndRemove({'movieId': req.body.movieId})
    .exec((err, result) => {
      if(err) {
        logger.error(err.message, 'Movie Controller: deleteMovie', 10);
        let apiResponse = response.generate(true, 'Failed To Find Movie Details', 500, null);
        res.send(apiResponse);
      } else if (check.isEmpty(result)) {
          logger.info('No Movie Found', 'movie Controller: deleteMovie');
          let apiResponse = response.generate(true, 'No Movie Found', 404, null);
          res.send(apiResponse);
      } else {
          let apiResponse = response.generate(false, 'Movie deleted', 200, null);
          res.send(apiResponse);
      }
    })
}


module.exports = {
getAllMovies: getAllMovies,
addMovie: addMovie,
getSingleMovie: getSingleMovie,
editMovie: editMovie,
deleteMovie: deleteMovie

}; // end exports
