const express =  require('express')
require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/ErrorMiddleware')
const { authRouter } = require('./routes/AuthRoutes')
const { examRouter } = require('./routes/ExamRoute')

// Init app
const app = express()

// Connect DB
connectDB()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(errorHandler)


// Routes
app.use('/api/auth', authRouter)
app.use('/api/exam', examRouter)


// Listen to server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})