const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./db/mongoose')

dotenv.config()

// issue the connection to database
connectDB()

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})