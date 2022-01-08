const mongoose = require("mongoose");
const timeSlot = new mongoose.Schema({ start: Date, end: Date })

const profileSchema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    description: { type: String },
    availability: { type: [timeSlot] },
    address: { type: String },
    dateOfBirth: { type: Date },
    photo: { type: String },
    socialMedia: { type: String }
});

module.exports = User = mongoose.model("user", profileSchema);