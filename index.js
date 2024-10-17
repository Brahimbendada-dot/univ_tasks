const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require("mongoose")
const cors = require("cors")
const taskRouter = require('./routes/task_route')
const moduleRouter = require('./routes/module_route')
const app = express()
const path = require("path")

console.log(__dirname)
// use middlewere
app.use(express.json())
app.use(cors())

// connect mongo db
mongoose.connect(process.env.MONGO_URL).then(res => console.log("Mongo Db Connected ")).catch(err => console.log(err))


// api routes
app.use('/api/v1/tasks', taskRouter)
app.use('/api/v1/modules', moduleRouter)


// use the client app 
app.use(express.static(path.join(__dirname, 'client/build')))

// render client application
app.get("*", (req, res) => res.sendFile(path.join(__dirname, 'client/build/index.html')))

// start the server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port  ${process.env.PORT}`)
})
