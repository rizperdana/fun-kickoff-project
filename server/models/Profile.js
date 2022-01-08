const Schema = mongoose.Schema;

const profileSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
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
        enum: ["male", "female", "non-binary"],
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
            enum: [
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