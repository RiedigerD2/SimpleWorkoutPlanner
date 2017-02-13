var model = require('../database/server.model.js');



module.exports.getAllBodyParts = function() {
    console.log('get all')
    return model.bodyPart.find().sort('bodyPartName').exec();
}


module.exports.getBodyPartByName = function(name) {
    console.log(name);
    return model.bodyPart.find({
        bodyPartName: {
            $regex: name,
            $options: 'i'
        }
    }).sort('bodyPartName').exec();
}


module.exports.getBodyPartById = function(bodyPartId) {
    return model.bodyPart.findOne({
        _id: bodyPartId
    }).populate('muscles').exec();
}