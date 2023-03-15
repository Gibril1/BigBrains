const asyncHandler = require('express-async-handler')
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
            resolve: asyncHandler(async (parent:any, args:any, context:any) => {
                const user = context.req.user;
                if (!user) {
                    throw new Error('You are not authorized')
                }
                return await Exam.find()
            })
        },
        exam: {
            type: ExamType,
            args: { id:  { type: GraphQLID }},
            resolve: asyncHandler(async (parent:any, args:any, context:any) => {
                const user = context.req.user;
                if (!user) {
                    throw new Error('You are not authorized')
                }
                return await Exam.findById(args.id)
            })
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
            },
            resolve: asyncHandler(async (parent:any, args:any, context:any) =>{
                const user = context.req.user

                if(!user){
                    throw new Error('You are not authorized')
                }

                if(user.role !== 'admin'){
                    throw new Error('You are not authorized. You are a student')
                }

                
                const exam = await Exam.create({
                    name: args.name,
                    description: args.description,
                    userId: user._id
                }) as IExam
                return exam
            })
        },
        // Update An Exam
        updateExam: {
            type: ExamType,
            args:{
                id: { type:  new GraphQLNonNull(GraphQLID)},
                name:{ type: GraphQLString  },
                description:{ type: GraphQLString },
            },
            resolve: asyncHandler(async (parent:any, args:any, context:any) => {
                const user = context.req.user

                if(user.role !== 'admin'){
                    throw new Error('Not Authorized')
                }

                const exam = Exam.findById({ id: args.id })

                if (!exam) {
                    throw new Error(`Exam with id ${args.id} does not exist`);
                  }

                if(exam.userId !== user._id){
                    throw new Error('You are not authorized to update this exam')
                }
              
                return await Exam.findByIdAndUpdate(
                    args.id, {
                        $set:{
                            name: args.name,
                            description: args.description,
                            userId: user._id,
                        }
                    }, { new: true }
                )
            })
        },
        // Delete An Exam
        deleteExam:{
            type: ExamType,
            args:{
                id: { type:  new GraphQLNonNull(GraphQLID)},
            },
            resolve: asyncHandler(async (parent:any, args:any, context:any) =>  {
                const user = context.req.user

                if(!user){
                    throw new Error('You are not authorized')
                }

                if(user.role !== 'admin'){
                    throw new Error('Not Authorized')
                }

                const exam = Exam.findById({ id: args.id })

                if (!exam) {
                    throw new Error(`Exam with id ${args.id} does not exist`);
                  }

                if(exam.userId !== user._id){
                    throw new Error('You are not authorized to update this exam')
                }
                await Exam.findByIdAndRemove(args.id)
            })
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