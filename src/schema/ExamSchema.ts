import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} from 'graphql'
const Exam = require('../models/ExamModel')
import { UserType } from './UserSchema'

// Exam Type
const ExamType = new GraphQLObjectType({
    name: 'Exam',
    fields: () => ({
        id: {  type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { 
            type: UserType,
            resolve(parent, args) {
                return Exam.find(parent.userId)
            } }
    })
})

export {
    ExamType
}