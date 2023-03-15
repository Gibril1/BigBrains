const express =  require('express')
require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/ErrorMiddleware')
const { authRouter } = require('./routes/AuthRoutes')
const { examRouter } = require('./routes/ExamRoutes')
const { QARouter } = require('./routes/QARoutes')
const { protect } = require('./middleware/AuthMiddleware')

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
app.use('/api/exam', protect, examRouter)
app.use('/api/qa', protect, QARouter)


// Listen to server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})