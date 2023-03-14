const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

import { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema
} from 'graphql'

import { 
    UserType, 
    LoginType 
} from '../schema/UserSchema'

const User = require('../models/UserModel')
const Student = require('../models/StudentModel')
const Admin = require('../models/AdminModel')
import { IUser } from '../models/UserModel'
import { IAdmin } from '../models/AdminModel'
import { IStudent } from '../models/StudentModel'

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        hello: {
            type: GraphQLString,
            async resolve(parent, args){
                return { message: 'Welcometo Examination Hub'}
            }
        }
    }
})

// Mutation
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        // Create User
        addUser:{
            type: UserType,
            args:{
                email:{ type: new GraphQLNonNull(GraphQLString)},
                password:{ type: new GraphQLNonNull(GraphQLString)},
                role:{ type: new GraphQLNonNull(GraphQLString)},
                firstName:{ type: new GraphQLNonNull(GraphQLString)},
                lastName:{ type: new GraphQLNonNull(GraphQLString)},
                bio:{ type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parent, args){
                try {

                    const userExists = await User.findOne({ email: args.email })

                    if(userExists){
                        return { message: `User with email ${args.email} already exists`}
                    }

                    // hash password
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(args.password, salt)


                    const user = await User.create({
                        email : args.email,
                        password: hashedPassword,
                        role: args.role
                    }) as IUser
                    if(user.role === 'student'){
                        const student = await Student.create({
                            userId : user.id,
                            firstName: args.firstName,
                            lastName: args.lastName,
                            bio: args.bio
                        }) as IStudent
                        return student
                    }else if(user.role === 'admin'){
                        const admin = await Admin.create({
                            userId : user.id,
                            firstName: args.firstName,
                            lastName: args.lastName,
                            bio: args.bio
                        }) as IAdmin
                        return admin
                    }else {
                        return { message: 'Invalid Data', status: 400   }
                    }
                } catch (error) {
                    return { status: 500, message: 'Error'}
                }
            }
        },
        // Login User
        loginUser: {
            type: LoginType,
            args: {
                email:{ type: new GraphQLNonNull(GraphQLString)},
                password:{ type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args){
                try {
                    const requiredFields = [args.email, args.password] as (string | undefined | null)[]

                    // check the correctness of the email and password
                    requiredFields.some((field: string | undefined | null) => {
                        if(!field || field === ''){
                            return { message: 'Please enter the required fields'   }
                        }
                    }) 
                    
                    // is email valid
                    if(!validator.isEmail(args.email)){
                        return { message: `This email ${args.email} is not a valid email` }
                    }

                    // checks if user actually exists
                    const user = await User.findOne({ email: args.email })
                    if(!user){
                        return { message: `User with email ${args.email} does not exist` }
                    }

                    // compares passwords and returns tokens if valid
                    if(user && bcrypt.compare(args.password, user.password)){
                        return { token: generateToken(user.id) }
                    }else{
                        return { status: 400, message: 'Invalid Credentials'   }
                    }
                } catch (error) {
                    return { status: 500, message: error }
                }

             }
        }

    }
    
})

// Token Generator
const generateToken = ( id:string ) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'})
}

const UserSchema = new GraphQLSchema({
    mutation,
    query: RootQuery
})

module.exports = {
    UserSchema
}

export {
    
}