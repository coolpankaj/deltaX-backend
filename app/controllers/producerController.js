const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib');

const ProducerModel = mongoose.model('Producer');

let getAllProducers = (req, res) => {
    ProducerModel.find()
    .select('-__v -_id')
    .lean()
    .exec((err, result) => {
        if(err) {
            logger.error(err.message, 'producerController: getAllProducers', 10)
            let apiresponse = response.generate(true, 'Failed to find producer details', 500, null)
            res.send(apiresponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Producer Found', 'Producer Controller: getAllProducer')
            let apiResponse = response.generate(true, 'No producer Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All producer listed', 200, result)
            res.send(apiResponse)
        }
    })
    
}


let addProducer = (req, res) => {

        if(req.body.producerName){
            let newProducer = new ProducerModel({
                producerId: shortid.generate(),
                producerName: req.body.producerName
            })
            
            newProducer.save((err, result) => {
                if(err) {
                    logger.error(err.message, 'producerController: addProducer', 10)
                    let apiResponse = response.generate(true, 'failed to insert producer', 500, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'producer added', 200, null )
                    res.send(apiResponse)
                }
            })

        } else {
            let apiResponse = response.generate(true, 'producer name missing', 400, null)
            res.send(apiResponse)
        }      
        
}

module.exports ={
    getAllProducers: getAllProducers,
    addProducer: addProducer
}