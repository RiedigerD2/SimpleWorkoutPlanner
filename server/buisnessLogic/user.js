var model = require('../database/server.model.js')


module.exports.getUserByFacebookID = function(id) {
    return model.user.findOne({
        facebook_id: id
    }).exec();
}