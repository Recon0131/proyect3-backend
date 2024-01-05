import {model,Schema} from 'mongoose'

const commentSchema = new Schema({
    comment:{
        type: String,
        require: true,
    },
    userId: {
        type: String,
        require: true,
    },
    postId:{
        type: String,
        require: true,
    },
},{
    timestamps: true,
})

export default model("Comment", commentSchema)