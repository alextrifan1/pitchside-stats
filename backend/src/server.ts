import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pitchside';

async function startServer() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Successfully connected to MongoDB.');

        app.listen(PORT, () => {
            console.log(`Server executing in environment, listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Fatal initialization error during server bootstrap:', error);
        process.exit(1);
    }
}

startServer();