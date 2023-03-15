import { Request } from "express"
const { ExamSchema } = require('../queries/ExamQueries')
const { graphqlHTTP } = require('express-graphql')


export const examRouter = graphqlHTTP((req: Request) => ({
    schema: ExamSchema,
    graphiql: process.env.NODE_ENV === 'development',
    context: { req }
}))