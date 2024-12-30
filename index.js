
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import logger from "./logger.js";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms";


const app = express()
const port = process.env.PORT || 3000


// Database Connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => logger.info('Connected to MongoDB'))
    .catch((err) => {
        logger.error('Error connecting to MongoDB', err);
        process.exit(1);
    });

// Logger Middleware
app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    })
);

app.use(express.json())

app.get('/', (req, res) => {
    res.send(`Hello World!`)
})

// User Routes
app.use('/users', userRoutes)

app.use('/admin', adminRoutes)


app.listen(port, () => {
    console.log(`Server is running at app listening on port ${port}...`)
})
