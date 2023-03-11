import {
    GraphQLObjectType,
    GraphQLList
} from 'graphql'

import {
    ExamType
} from '../schema/ExamSchema'

const Exam = require('../models/ExamModel')

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        exams: {
            type: new GraphQLList(ExamType),
            async resolve(parent, args){
                return await Exam.find()
            }
        }
    }

})