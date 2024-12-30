import mongoose from 'mongoose';
import logger from '../logger';

const uri = process.env.MONGO_URI;

const clearDatabase = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;

        // Drop all collections
        await db.dropDatabase();
        console.log('Database dropped successfully');
    } catch (error) {
        console.error('Error clearing the database:', error);
    } finally {
        mongoose.connection.close();
    }
};


export default clearDatabase;
