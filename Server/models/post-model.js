const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const Schema = mongoose.Schema;
const PostSchema = new Schema({
   postedBy:{
      type: ObjectId,
      ref: "User",
   },
   country:{
      type: ObjectId,
      ref: "Country",
   },
   title:{
      type: String,
      required: true,
      maxlength: 50,
   },
   content:{
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
   },
   postPhoto:{
      type: String,
   },
   likes:[{
      type: ObjectId,
      ref: 'User',
   }],
   comments:[{
      text: String, 
      postedBy: { 
         type: ObjectId,
         ref: 'User',
      },
   }],
   saved:[{
      savedBy: {
         type: ObjectId,
         ref: 'User',
      }, 
      postId: {
         type: ObjectId,
         ref: 'Post',
      },
   }],
   pinned: {
      type: Boolean,
   }
},{ timestamps:true});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;