const mongoose = require("mongoose");

const connectDB = async() => {
    let db_uri
    if (process.env.NODE_ENV === 'test') {
        db_uri = process.env.MONGO_URI + '-test';
    } else {
        db_uri = process.env.MONGO_URI
    }
    const conn = await mongoose.connect(db_uri);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;