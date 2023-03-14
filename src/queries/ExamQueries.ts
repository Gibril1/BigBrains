import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID
} from 'graphql'

import {
    ExamType
} from '../schema/ExamSchema'

const Exam = require('../models/ExamModel')
import { IExam } from '../models/ExamModel'

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        exams: {
            type: new GraphQLList(ExamType),
            async resolve(parent, args){
                return await Exam.find()
            }
        },
        exam: {
            type: ExamType,
            args: { id:  { type: GraphQLID }},
            async resolve(parent, args){
                return await Exam.findById(args.id)
            }
        }
    }
})

// Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        // Add Exam
        addExam: {
            type: ExamType,
            args:{
                name:{ type: new GraphQLNonNull(GraphQLString)  },
                description:{ type: GraphQLString },
                // userId: { type:  new GraphQLNonNull(GraphQLID)}
            },
            async resolve(parent, args){
                const exam = await Exam.create({
                    name: args.name,
                    description: args.description,
                    // userId: args.userId
                }) as IExam
                return exam
            }
        },
        // Update An Exam
        updateExam: {
            type: ExamType,
            args:{
                id: { type:  new GraphQLNonNull(GraphQLID)},
                name:{ type: new GraphQLNonNull(GraphQLString)  },
                description:{ type: GraphQLString },
                // userId: { type:  new GraphQLNonNull(GraphQLID)}
            },
            async resolve(parent, args) {
                return await Exam.findByIdAndUpdate(
                    args.id, {
                        $set:{
                            name: args.name,
                            description: args.description,
                            // userId: args.userId,
                        }
                    }, { new: true }
                )
            }
        },
        // Delete An Exam
        deleteExam:{
            type: ExamType,
            args:{
                id: { type:  new GraphQLNonNull(GraphQLID)},
            },
            async resolve(parent, args){
                await Exam.findByIdAndRemove(args.id)
            }
        }
    }
})



            



const ExamSchema = new GraphQLSchema({
    mutation: Mutation,
    query: RootQuery    
})

module.exports = {
    ExamSchema
}

export {

}