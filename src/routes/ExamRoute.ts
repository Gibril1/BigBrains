const { schema } = require('../queries/ExamQueries')
const { graphqlHTTP } = require('express-graphql')

export const examRouter = graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
})
    


