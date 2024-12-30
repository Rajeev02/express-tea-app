import express from 'express';
import mongoose from 'mongoose';
import logger from '../logger.js';
import protect from '../middleware/authMiddleware.js';

const uri = process.env.MONGO_URI;

const router = express.Router();

// Delete the entire database and reconnect
router.delete('/', protect, async (req, res) => {
    try {
        // Ensure Mongoose is connected
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('Connected to MongoDB');
        }

        const db = mongoose.connection.db;

        // Drop the database
        await db.dropDatabase();
        console.log('Database dropped successfully');
        logger.info('Database dropped successfully');

        // Reconnect to MongoDB to ensure further operations work
        await mongoose.disconnect(); // Cleanly disconnect
        console.log('Disconnected from MongoDB after dropping database');
        mongoose.connection.removeAllListeners();

        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Reconnected to MongoDB');
        logger.info('Reconnected to MongoDB after clearing the database');

        // Respond with success
        res.status(200).json({ message: 'Database cleared and reconnected successfully' });
    } catch (error) {
        console.error('Error clearing the database:', error);
        logger.error('Error clearing the database', error);

        // Respond with an error
        res.status(500).json({ message: error.message });
    }
});

export default router;


// import express from 'express';
// import mongoose from 'mongoose';
// import logger from '../logger.js';
// import protect from '../middleware/authMiddleware.js';

// const uri = process.env.MONGO_URI;

// const router = express.Router();

// // Delete the entire database
// router.delete('/', protect, async (req, res) => {
//     try {
//         // Connect to MongoDB
//         await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log('Connected to MongoDB');

//         const db = mongoose.connection.db;

//         // Drop the database
//         await db.dropDatabase();
//         console.log('Database dropped successfully');
//         logger.info('Database dropped successfully');

//         // Reconnect to the database after dropping
//         await mongoose.disconnect(); // Close the existing connection
//         await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log('Reconnected to MongoDB');
//         logger.info('Reconnected to MongoDB after clearing the database');

//         // Respond with success
//         res.status(200).json({ message: 'Database cleared and reconnected successfully' });
//     } catch (error) {
//         console.error('Error clearing the database:', error);
//         logger.error('Error clearing the database', error);

//         // Respond with an error
//         res.status(500).json({ error: error.message });
//     } finally {
//         // Close the connection
//         await mongoose.connection.close();
//     }
// });

// export default router;
