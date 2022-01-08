// This function used for validation any object
// Currently it only check id validation
// Will add more validation in future if required
const mongoose = require('mongoose');

// We are gonna check if id is valid
exports.id = function(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res
            .status(400)
            .send('Malformed request')
    }
    next();
}