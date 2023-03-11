import { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLString 
} from 'graphql'

// User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString},
        password: { type: GraphQLString},
        role: { type: GraphQLString},
        firstName: { type: GraphQLString},
        lastName: { type: GraphQLString},
        bio: { type: GraphQLString}
    })
})

// Login Type
const LoginType = new GraphQLObjectType({
    name: 'Login',
    fields: () => ({
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    })
})


export {
    UserType,
    LoginType
}