import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectDB from './config/connectDB.js'
import web from './routes/web.js'
const app = express()
const port = process.env.PORT || 3000;
const DATA_BASE_URL = process.env.DATA_BASE_URL

app.use(express.urlencoded({extended:false}))
connectDB(DATA_BASE_URL)

app.use(express.json())
app.use('/api',web)

app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`);
})