const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib');

const ActorModel = mongoose.model('Actor');

let getAllActors = (req, res) => {
    ActorModel.find()
    .select('-__v -_id')
    .lean()
    .exec((err, result) => {
        if(err) {
            logger.error(err.message, 'actorController: getAllActors', 10)
            let apiresponse = response.generate(true, 'Failed to find actor details', 500, null)
            res.send(apiresponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Actor Found', 'Movie Controller: getAllActors')
            let apiResponse = response.generate(true, 'No actor Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All actors listed', 200, result)
            res.send(apiResponse)
        }
    })
    
}


let addActor = (req, res) => {

        if(req.body.actorName){
            let newActor = new ActorModel({
                actorId: shortid.generate(),
                actorName: req.body.actorName
            })
            
            newActor.save((err, result) => {
                if(err) {
                    logger.error(err.message, 'actorController: addActor', 10)
                    let apiResponse = response.generate(true, 'failed to insert actor', 500, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'actor added', 200, null )
                    res.send(apiResponse)
                }
            })

        } else {
            let apiResponse = response.generate(true, 'actor name missing', 400, null)
            res.send(apiResponse)
        }      
        
}

module.exports ={
    getAllActors: getAllActors,
    addActor: addActor
}