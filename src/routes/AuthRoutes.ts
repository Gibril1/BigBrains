const { schema } = require('../queries/UserQueries')
const { graphqlHTTP } = require('express-graphql')


export const authRouter = graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
})

