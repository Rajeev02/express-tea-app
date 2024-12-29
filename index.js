
import 'dotenv/config'
import express from 'express'
import userRoutes from './routes/userRoutes.js'
import teaRoutes from './routes/teaRoutes.js'
import logger from "./logger.js";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms";


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


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
let teas = []
let id = 0

app.get('/', (req, res) => {
    res.send(`Hello Tea World!`)
})

// Tea Routes
app.use('/teas', teaRoutes)
// User Routes
app.use('/users', userRoutes)
app.listen(port, () => {
    console.log(`Server is running at app listening on port ${port}...`)
})
