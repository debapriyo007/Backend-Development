const express = require('express')
const app = express()
//import db .
const dbConnect = require('./config/db')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const PORT = process.env.PORT || 8000

app.listen(PORT , ()=>{
    console.log(`My App is listing at ${PORT}`)
})
//call db connect 
dbConnect();
app.use(cookieParser());
//need a middleware.
app.use(express.json())

//import all router.
const allRouter = require('./routers/router')
app.use('/api/v5', allRouter)

app.get('/', (req, res) =>{
    res.send('<h1>Hello I am Debu</h1>')
})