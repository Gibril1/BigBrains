import mongoose, { Schema, Types } from "mongoose";

export interface IStudent {
    _id?: Types.ObjectId,
    firstName: string,
    lastName: string,
    bio: string,
    userId?: Types.ObjectId
}

const StudentSchema = new Schema<IStudent>({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    bio:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model<IStudent>('Student', StudentSchema)