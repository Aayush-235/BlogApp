import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blog : {
        type : mongoose.Schema.Types.ObjectId, // refer => blog is objectId
        ref : 'blog', //blog field stores => ObjectId => refer a document in blog collection
        required : true
    },

    name : {
        type : String,
        required : true
    }, 

    content : {
        type : String,
        required : true
    }, 

    isApproved : {
        type : Boolean,
        default : false
    }


}, { timestamps: true })

const comment = mongoose.model('comment', commentSchema);

export default comment;