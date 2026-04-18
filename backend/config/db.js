const mongoose = require('mongoose');

// I wrote this funtion to handle the MongoDB connection separately so that server.js stays clean
const connectDB = async () => {
    // I'm using try/catch here because mongoose.connect can fail
    // for example if the MONGO_URI is wrong or Atlas is down
    try {
        await mongoose.connect(process.env.MONGO_URI);
        // simple message so I know in the terminal that it worked
        console.log(`MongoDB Connected Successfully`);

    } catch (error) {
        // error msg so I can see what actually went wrong
        console.error("MongoDB connection failed:", error.message);
    }
};

module.exports = connectDB;
