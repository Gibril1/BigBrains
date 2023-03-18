import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
} from 'graphql'
const ExamScore = require('../models/ExamScoreModel')
import { UserType } from './UserSchema'
import { ExamType } from './ExamSchema'

// ExamScore Type
const ExamScoreType = new GraphQLObjectType({
    name:'ExamScore',
    fields: () => ({
        id: { type: GraphQLID },
        examId: { 
            type: ExamType,
            resolve(parent, args){
                return ExamScore.find(parent.examId)
            } },
        userId: { 
            type: UserType,
            resolve(parent, args) {
                return ExamScore.find(parent.userId)
            } },
        score: { type: GraphQLInt }
    })
})

export {
    ExamScoreType
}