import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt
} from 'graphql'

const QA = require('../models/QAModel')
import { UserType } from './UserSchema'
import { ExamType } from './ExamSchema'


// QA Type
const QAType = new GraphQLObjectType({
    name: 'QA',
    fields: () => ({
        id:{ type: GraphQLID },
        question: { type: GraphQLString },
        optionOne: { type: GraphQLString },
        optionTwo: { type: GraphQLString },
        optionThree: { type: GraphQLString },
        optionFour: { type: GraphQLString },
        correctAnswer: { type: GraphQLInt },
        userId: {
            type: UserType,
            resolve(parent, args) {
                return QA.find(parent.userId)
            }
        },
        examId: {
            type: ExamType,
            resolve(parent, args) {
                return QA.find(parent.examId)
            }
        },
    })
})

export {
    QAType
}