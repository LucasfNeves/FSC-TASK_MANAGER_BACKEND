const mongoose = require("mongoose");

const connectToDatabase = async () => {
    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fsctaskmanagercluster.k1woinc.mongodb.net/?retryWrites=true&w=majority&appName=FscTaskManagerCluster`,
        () => console.log('Connected to MongoDB')
    );
};

module.exports = connectToDatabase


