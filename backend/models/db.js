const mongoose = require('mongoose');
require('dotenv').config();

const mongourl = process.env.MONGODB_URI;

if (!mongourl) {
    console.error('✗ MONGODB_URI is not defined in environment variables');
    console.error('Please set MONGODB_URI in your .env file');
} else {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    };
    mongoose.connect(mongourl, options)
    .then(() => {
        console.log('✓ Connected to MongoDB successfully');
        console.log(`  Database: ${mongoose.connection.db.databaseName}`);
    })
    .catch((err) => {
        console.error('✗ Error connecting to MongoDB:', err.message);
        console.error('  Error name:', err.name);
        console.error('Please check:');
        console.error('  1. MongoDB is running (for local): brew services start mongodb-community');
        console.error('     OR start MongoDB manually');
        console.error('  2. MONGODB_URI in .env file is correct');
        console.error('  3. Network connection is available');
        console.error('');
        console.error('NOTE: Server will start but database operations will fail until MongoDB is connected.');
    });
    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err.message);
    });
    mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected. Attempting to reconnect...');
    });
    mongoose.connection.on('reconnected', () => {
        console.log('✓ MongoDB reconnected successfully');
    });
}

module.exports = mongoose;