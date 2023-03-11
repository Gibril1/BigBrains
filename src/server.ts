const express =  require('express')
require('dotenv').config()
const port = process.env.PORT || 500
const { graphqlHTTP } = require('express-graphql')
const connectDB = require('./config/db')
const UserSchema = require('./schema/UserSchema')
import 'colorts/lib/string'

// Init app
const app = express()

// Connect DB
connectDB()

// Middlewares
app.use(
    '/auth',
    graphqlHTTP({
        schema: UserSchema,
        graphiql: process.env.NODE_ENV == 'development'
    })
)
// Listen to server
app.listen(port, () => {
    console.log(`Server running on port ${port}`.red.underline)
})