const asyncHandler = require('express-async-handler')
import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
} from 'graphql'

import { ExamType } from '../schema/ExamSchema'
const Exam = require('../models/ExamModel')
import { QAType } from '../schema/QASchema'
const QA = require('../models/QAModel')
import { IQA } from '../models/QAModel'


// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        questions:{
            type: new GraphQLList(ExamType),
            args:{ examId: { type: GraphQLID }},
            resolve: asyncHandler(async (parent:any, args:any, context:any) =>  {
                const user = context.req.user
                if(!user) throw new Error('You are not authorized') 
                return await QA.find({ examId: args.examId })
            })
        }
    }
})

// Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        // Add QA
        addQA:{
            type: QAType,
            args: {
                examId: { type: new GraphQLNonNull(GraphQLID) },
                question: { type: new GraphQLNonNull(GraphQLString)  },
                optionOne: { type: GraphQLString },
                optionTwo: { type: GraphQLString },
                optionThree: { type: GraphQLString },
                optionFour: { type: GraphQLString },
                correctAnswer: { type: GraphQLInt },
            },
            resolve: asyncHandler(async (parent:any, args:any, context:any) => {
                const user = context.req.user
                if(!user) throw new Error('You are not authorized')

                if(user.admin === 'admin') throw new Error('You are a student. Error')

                const exam = await Exam.findById({ id: args.examId})

                if(!exam) throw new Error(`Exam with id ${args.id} does not exist`)

                const qa = await QA.create({
                    question : args.question,
                    optionOne : args.optionOne,
                    optionTwo : args.optionTwo,
                    optionThree : args.optionThree,
                    optionFour : args.optionFour,
                    correctAnswer : args.correctAnswer,
                    examId: exam._id,
                    userId: user._id
                }) as IQA
                return qa
            })
        },
        // Update a QA
        updateQA:{
            type: QAType,
            args: {
                id: { type:  new GraphQLNonNull(GraphQLID)},
                question: { type: GraphQLString  },
                optionOne: { type: GraphQLString },
                optionTwo: { type: GraphQLString },
                optionThree: { type: GraphQLString },
                optionFour: { type: GraphQLString },
                correctAnswer: { type: GraphQLInt },
            },
            resolve: asyncHandler(async (parent:any, args:any, context:any) => {
                const user = context.req.user

                if(!user) throw new Error('Not Authorized')
                if(user.role !== 'admin') throw new Error('Not A Student')

                const qa = await QA.findById({ id: args.id })
                if(!qa) throw new Error(`Question with id of ${args.id} does not exist`)

                if(qa.userId !== user._id)  throw new Error('You are not authorized to edit this question')


                return await QA.findByIdAndUpdate(
                    args.id, {
                        $set:{
                            question: args.question,
                            optionOne: args.optionOne,
                            optionTwo: args.optionTwo,
                            optionThree: args.optionThree,
                            optionFour: args.optionFour,
                            correctAnswer: args.correctAnswer,
                        }
                    }, { new: true }
                )
            })
        },
        // Delete a QA
        deleteQA:{
            type: QAType,
            args: {
                id: { type:  new GraphQLNonNull(GraphQLID)},
            },
            resolve: asyncHandler(async (parent:any, args:any, context:any) => {
                const user = context.req.user

                if(!user) throw new Error('Not Authorized')
                if(user.role !== 'admin') throw new Error('Not A Student')

                const qa = await QA.findById({ id: args.id })
                if(!qa) throw new Error(`Question with id of ${args.id} does not exist`)

                if(qa.userId !== user._id)  throw new Error('You are not authorized to edit this question')

                await QA.findByIdAndRemove(args.id)
            })
        }
    }
})

const QASchema = new GraphQLSchema({
    mutation: Mutation,
    query: RootQuery
})

module.exports = {
    QASchema
}

export {

}