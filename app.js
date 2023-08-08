const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleWare = require('./middleware/error-handler')
const connectDB = require('./db/connect')
require('dotenv').config()



app.use(express.static('./public'))
app.use(express.json())

app.use(notFound)
app.use(errorHandlerMiddleWare)

app.use('/api/v1/tasks', tasks)

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(4000, () => {
            console.log("Server is listening on Port 4000")
        })
    }
    catch (error){
        console.log(error)
    }
}
start()


