import mongoose, { Schema, Types } from "mongoose";


export interface IExamScore {
    _id?: Types.ObjectId,
    examId?: Types.ObjectId,
    userId?: Types.ObjectId,
    score: number
}

const ExamScoreSchema = new Schema<IExamScore>({
    examId:{
        type: Types.ObjectId,
        ref: 'Exam',
        required: true
    },
    userId: {
        type: Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    score:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model<IExamScore>('ExamScore', ExamScoreSchema)