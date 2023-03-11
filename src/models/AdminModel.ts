import mongoose, { Schema, Types } from "mongoose";

export interface IAdmin {
    firstName: string,
    lastName: string,
    bio: string,
    userId?: Types.ObjectId 
}

const AdminSchema = new Schema<IAdmin>({
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

module.exports = mongoose.model<IAdmin>('Admin', AdminSchema)