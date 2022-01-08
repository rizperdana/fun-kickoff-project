const Schema = mongoose.Schema;

const profileSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true
    },
    dateOfBirth: {
        type: Date
    },
    description: {
        type: String
    },
    availability: [{
        day: {
            type: String,
            num: [
                'sunday',
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday'
            ]
        },
        time: String,
        date: Date
    }],
    address: {
        type: String
    },
    photo: {
        type: String
    },
}, { timestamps: true });

module.exports = Profile = mongoose.model("Profile", profileSchema);