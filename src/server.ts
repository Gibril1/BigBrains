const express =  require('express')
require('dotenv').config()
const port = process.env.PORT || 5000
const { graphqlHTTP } = require('express-graphql')
const connectDB = require('./config/db')
// const UserSchema = require('./schema/UserSchema')
const { schema } = require('./queries/UserQueries')
import 'colorts/lib/string'

// Init app
const app = express()

// Connect DB
connectDB()

// Middlewares
app.use(
    '/auth',
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV == 'development'
    })
)
// Listen to server
app.listen(port, () => {
    console.log(`Server running on port ${port}`.red.underline)
})