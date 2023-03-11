const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
import { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} from 'graphql'

import { 
    UserType, 
    LoginType 
} from '../schema/UserSchema'

const User = require('../models/UserModel')
const Student = require('../models/StudentModel')
const Admin = require('../models/AdminModel')
import { IUser } from '../models/UserModel'

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
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(args.password, salt)


                const user = await User.create({
                    email : args.email,
                    password: hashedPassword,
                    role: args.role
                }) as IUser
                if(user.role === 'student'){
                    const student = await Student.create({
                        userId : user._id,
                        firstName: args.firstName,
                        lastName: args.lastName,
                        bio: args.bio
                    })
                    return student
                }else if(user.role === 'admin'){
                    const admin = await Admin.create({
                        userId : user._id,
                        firstName: args.firstName,
                        lastName: args.lastName,
                        bio: args.bio
                    })
                    return admin
                }else {
                    return {
                        message: 'Invalid Data'
                    }
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
                const requiredFields = [args.email, args.password] as (string | undefined | null)[];
                requiredFields.some((field: string | undefined | null) => {
                    if(!field || field === ''){
                        throw new Error('Please enter the required fields')
                    }
                }) 

                const user = await User.findOne({ email: args.email })

                if(!user){
                    throw new Error(`User with email ${args.email} does not exist`)
                }

                if(user && bcrypt.compare(args.password, user.password)){
                    return { token: generateToken(user.id) }
                }else{
                    throw new Error('Invalid Credentials')
                }

             }
        }

    }
    
})

const generateToken = ( id:string ) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'})
}