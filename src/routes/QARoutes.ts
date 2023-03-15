import { Request } from "express"
const { QASchema } = require('../queries/QAQueries')
const { graphqlHTTP } = require('express-graphql')

export const QARouter = graphqlHTTP((req: Request) => ({
    schema: QASchema,
    graphiql: process.env.NODE_ENV === 'development',
    context: { req }
}))