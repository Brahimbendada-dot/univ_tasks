const Task = require('../model/task')
const path = require("path")
const fs = require('fs')

const createTask = async (req,res)=>{
    const newTask = new Task(req.body)
    try {
        const  task = await newTask.save()
        res.status(201).json({
            status:"success",
            data:{
                task
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}
const getAllTasks = async (req,res)=>{
    try {
        const  tasks = await Task.find({}).populate('module')
        res.status(200).json({
            status:"success",
            data:{
                tasks
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}
const getOneTask = async (req,res)=>{
    try {
        const  task = await Task.findById(req.params.id).populate('module')
        res.status(200).json({
            status:"success",
            data:{
                task
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}
const updateTask = async (req,res)=>{
    try {
        const  task = await Task.findByIdAndUpdate(req.params.id, req.body,{new:true})
        res.status(200).json({
            status:"success",
            data:{
                task
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}
const deleteTask = async (req,res)=>{
    try {
        const  task = await Task.findById(req.params.id.trim())
        if(task){
            task.files.map(filename=>{
            const filePath = path.join(__dirname.split('controller').join('uploads'),filename)
            fs.unlink(filePath,(err)=>{
                if(err){
                    return res.status(400).json({
                        status:'fail',
                        message:err.message
                    })
                }
                
            })
            
        })
        }
        await Task.findByIdAndDelete(req.params.id.trim())
        res.status(200).json({
            status:"success",
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}
const uploadFiles = async(req,res)=>{
    console.log(req.files)
    const files = []
    for(const file of req.files){
        files.push(file.filename)
    }
    console.log(files)
    try {
        const uploadFiles = await Task.findByIdAndUpdate(req.params.id,{files: files},{new :true})
        res.status(201).json({
            status:'success',
            data: {
                uploadFiles,
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}

const downloadFiles =async(req,res)=>{
    try {
        const task = await Task.findById(req.params.id);
        if(!task){
            res.status(400).json({
                status:'fail',
                message:'no task found'
            })
        }
        const file = task.files[req.params.index]
        const filePath = path.join(__dirname,`./${file}`)
       const path = path.join(__dirname,`./${file}`).split('controller').join('uploads');
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path, { recursive: true });
        }
        console.log(filePath.split('controller').join('uploads'))
        res.download(filePath.split('controller').join('uploads'))
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}
const addReview = async (req,res)=>{
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, {$push:{review:req.body.review}}, {new:true})
        res.status(200).json({
            status:"success",
            data:{
                task
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}

const getAllTasksOfSpecificModule = async(req,res)=>{
    try {
        const  tasks = await Task.find({module:req.params.id}).populate('module')
        res.status(200).json({
            status:"success",
            data:{
                tasks
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}
module.exports = {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
    getOneTask,
    uploadFiles,
    addReview,
    getAllTasksOfSpecificModule,
    downloadFiles
}
