const { ExamSchema } = require('../queries/ExamQueries')
const { graphqlHTTP } = require('express-graphql')

export const examRouter = graphqlHTTP({
    schema: ExamSchema,
    graphiql: process.env.NODE_ENV === 'development'
})
    


