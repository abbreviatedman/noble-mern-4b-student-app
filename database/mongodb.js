// MongoDB is a NoSQL database system
// mongoose is a JavaScript library for accessing MongoDB databases
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB.');
    } catch (error) {
        console.log(`Database connection failed: ${error}`);
    }
}

module.exports = connectToMongoDB;