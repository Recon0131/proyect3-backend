import {model,Schema} from 'mongoose'

const postSchema = new Schema({
    authorId:{
        type: String,
        require: true,
    },
    body:{
        type: String,
        require: true,
    },
},{
    timestamps: true,
})

export default model("Post", postSchema)