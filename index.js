const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
dotenv.config()
const todoroute = require('./routes/todoroute')
const userroute = require('./routes/userroute')
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

connectDB();

app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api/user' , userroute)
app.use('/api/todo' , todoroute)

app.listen(3000 , (req,res)=>{
    console.log('server is running smoothly...')
})