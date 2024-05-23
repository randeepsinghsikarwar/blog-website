const mongoose = require('mongoose')
const {Schema, model} = mongoose;

const PostSchema = new Schema({
    title: String,
    summary: String, 
    content: String,
    image: String,
    author: {type: Schema.Types.ObjectId, ref:'user'}
},{
    timestamps: true,
    autoIndex: true
})

const PostModel = model('Post', PostSchema);
module.exports = PostModel;