import mongoose, { Schema, Types } from "mongoose";


export interface IExam {
    _id?: Types.ObjectId,
    name: string,
    description: string,
    userId?: Types.ObjectId
}

const ExamSchema = new Schema<IExam>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    userId: {
        type: Types.ObjectId,
        ref: 'Admin',
        required: true
    }
})

module.exports = mongoose.model<IExam>('Exam', ExamSchema)