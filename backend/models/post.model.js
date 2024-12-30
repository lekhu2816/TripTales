import mongoose from "mongoose";
const postSchema= new mongoose.Schema({
   caption:{type:String,default:""},
   tag:{type:String,default:""},
   image:{type:String,required:true},
   likes:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
   fileType:{type:String,enum:['image','video']},
   author:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
   comment:[{type:mongoose.Schema.Types.ObjectId,ref:'Comment'}]

},{timestamps:true})

export const postModel=mongoose.model('Post',postSchema);
