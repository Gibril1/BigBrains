const { QASchema } = require('../queries/QAQueries')
const { graphqlHTTP } = require('express-graphql')

export const QARouter = graphqlHTTP({
    schema: QASchema,
    graphiql: process.env.NODE_ENV === 'development'
})