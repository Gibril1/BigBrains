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
            async resolve(parent, args) {
                return await QA.find({ emailId: args.emailId })
            }
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
                question: { type: new GraphQLNonNull(GraphQLString)  },
                optionOne: { type: GraphQLString },
                optionTwo: { type: GraphQLString },
                optionThree: { type: GraphQLString },
                optionFour: { type: GraphQLString },
                correctAnswer: { type: GraphQLInt },
            },
            async resolve(parent, args) {
                const qa = await QA.create({
                    question : args.question,
                    optionOne : args.optionOne,
                    optionTwo : args.optionTwo,
                    optionThree : args.optionThree,
                    optionFour : args.optionFour,
                    correctAnswer : args.correctAnswer,
                }) as IQA
                return qa
            }
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
            async resolve(parent, args){
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
            }
        },
        // Delete a QA
        deleteQA:{
            type: QAType,
            args: {
                id: { type:  new GraphQLNonNull(GraphQLID)},
            },
            async resolve(parent, args){
                await QA.findByIdAndRemove(args.id)
            }
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