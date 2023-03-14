import mongoose, { Schema, Types } from "mongoose";

export interface IQA {
    _id?: Types.ObjectId,
    examId?: Types.ObjectId,
    userId?: Types.ObjectId,
    question: string,
    optionOne: string,
    optionTwo: string,
    optionThree: string,
    optionFour: string,
    correctAnswer: string,
}

const QASchema = new Schema({
    examId:{
        type: Types.ObjectId,
        ref: 'Exam',
        required: true
    },
    // userId: {
    //     type: Types.ObjectId,
    //     ref: 'Admin',
    //     required: true
    // },
    question:{
        type: String,
        required: true
    },
    optionOne:{
        type: String,
        required: true
    },
    optionTwo:{
        type: String,
        required: true
    },
    optionThree:{
        type: String,
        required: true
    },
    optionFour:{
        type: String,
        required: true
    },
    correctAnswer: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true
    }
})

module.exports = mongoose.model<IQA>('QA', QASchema)