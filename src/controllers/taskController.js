const taskModel=require("../models/taskModel")
const mongoose=require('mongoose')
const isValid = function (value) {
    if (typeof value == undefined || value == null || value.length == 0) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true

}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidObjectId = function(objectId){
    return mongoose.Types.ObjectId.isValid(objectId)
}

const createTask=async function(req,res){
    try{
  let data=req.body;
  const {taskNumber,taskName,taskPersonName,taskDescription,isDeleted}=data;

  if (!isValidRequestBody(data)){
    return res.status(400).send({ status: false, msg: "plz enter some data" })
}
let saveData=await taskModel.create(data)
res.status(201).send({status:true,data:saveData,msg:"successfully created"})

    }catch(err){
        return res.status(500).send({status:false,msg:err.msg})
    }
}

const getTask=async function(req,res){
    try{
        const task= await taskModel.find()
        if(task.length==0){
            return res.status(400).send({status:false,msg:"No data found"})
        }
        return res.status(200).send({status:true,data:task,msg:"found data"})
    
    }catch(err){
        return res.status(500).send({status:false,msg:err.msg})
    }
}

const updateTask= async function(req,res){
   try{
        if (!isValidRequestBody(req.body)){
            return res.status(400).send({ status: false, msg: "plz enter some data" })
        } 
       
        const taskId=req.params._id
        const dataForUpdate=req.body
   const updateTask=await taskModel.findOneAndUpdate(taskId,req.body,{new:true})
   return res.status(200).send({status:true,data:updateTask,msg:"updated "})
    }catch(err){
        return res.status(500).send({status:false,msg:err.msg})
    }
}
const deleteTask=async function(req,res){
    try{
     let taskId=req.params._id
        let task=await taskModel.findOneAndUpdate(taskId,{isDeleted:true},{new:true})
        return res.status(200).send({status:true,data:task,msg:"Deleted "})
        
    }catch(err){
        return res.status(500).send({status:false,msg:err.msg})
    }
}
module.exports.createTask=createTask;
module.exports.getTask=getTask;
module.exports.updateTask=updateTask;
module.exports.deleteTask=deleteTask;