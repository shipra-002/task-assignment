const express=require('express')
const router=express.Router();

const taskController=require("../controllers/taskController")

router.post('/createTask',taskController.createTask)
router.get('/getTask',taskController.getTask)
router.put('/updateTask',taskController.updateTask)
router.delete('/deleteTask',taskController.deleteTask)

module.exports=router;