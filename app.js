import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectdb.js'


const app = express()
const port = process.env.PORT
const DB_URL = process.env.DB_URL

// DB Connection
connectDB(DB_URL)

// CORS
app.use(cors())

// JSON
app.use(express.json())

// test server
app.get('/', (req, res) => {
    res.json({
        message: "Hello World!"
    })
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})