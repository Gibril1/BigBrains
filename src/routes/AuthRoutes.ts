import { Request, Response, NextFunction } from "express"
const { schema } = require('../queries/UserQueries')
const { graphqlHTTP } = require('express-graphql')


const authRouter = (req:Request, res:Response, next:NextFunction) => {
    return (
        graphqlHTTP({
            schema,
            graphiql: process.env.NODE_ENV == 'development'
        })
    )
}

export default authRouter