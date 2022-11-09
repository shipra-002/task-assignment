const mongoose=require('mongoose')


const taskSchema=new mongoose.Schema({
    taskNumber:{
        type:Number,
        required:true,

    },
    taskName:{
        type:String,
    },
    taskPersonName:{
        type:String,
    },
    taskDescriptipon:{
        type:String,
    },
   isDeleted:{
    type:Boolean,
    default:false,
   },
},{timestamps:true})
module.exports=mongoose.model("task",taskSchema)