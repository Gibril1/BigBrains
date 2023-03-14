const { UserSchema } = require('../queries/UserQueries')
const { graphqlHTTP } = require('express-graphql')


export const authRouter = graphqlHTTP({
    schema: UserSchema,
    graphiql: process.env.NODE_ENV === 'development'
})

