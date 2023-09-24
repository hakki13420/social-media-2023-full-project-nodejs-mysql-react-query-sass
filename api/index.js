require('dotenv').config()
const express= require('express')
const authRoute= require('./routes/auth')
const userRoute= require('./routes/users')
const postRoute= require('./routes/posts')
const commentRoute= require('./routes/comments')
const likeRoute= require('./routes/likes')
const relationShipsRoute= require('./routes/relationShips')
const storiesRoute= require('./routes/stories')
const sharesRoute= require('./routes/shares')
const uploadRoute= require('./routes/upload')
const { connect } = require('./database/db')
const cors = require('cors')
const cookieParser=require('cookie-parser')
const {upload} = require('./middlewares/middlewares')

const app=express()

//middlewares
app.use(cors({
    origin: process.env.CLIENT_URL, // necesary for using cookies
  credentials: true, // necesary for using cookies
}))
app.use(cookieParser())
app.use(express.json())


//routes
app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/comments',commentRoute)
app.use('/api/likes',likeRoute)
app.use('/api/relationShips',relationShipsRoute)
app.use('/api/stories',storiesRoute)
app.use('/api/shares',sharesRoute)

app.use('/api/upload',uploadRoute)


const port=process.env.PORT || 3000

app.listen(port, ()=>console.log(`server running on ${port} port`))
