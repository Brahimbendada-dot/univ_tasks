const Task = require('../model/task')
const path = require("path")
const fs = require('fs')
const bucket = require('../utils/firebase_config')
const { Storage } = require('@google-cloud/storage');


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
const uploadFiles = async (req, res) => {
    try {
        const filesUrl = [];
        const filesNameInMongo = []

        // Loop through each file in req.files
        console.log(req.files)

        if(req.files){
            for (const file of req.files) {
                const filePath = path.join(__dirname.split('controller').join('uploads'), file.filename);
                // Upload the file to Firebase Storage
                const [uploadedFile] = await bucket.upload(filePath, {
                    destination: `uploads/${file.originalname}`, // Upload to 'uploads/' directory
                    metadata: {
                        contentType: file.mimetype,
                    },
                });
    
                // Remove the local file after uploading
                fs.unlinkSync(filePath);
    
                // Get the public URL of the uploaded file
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${uploadedFile.name}`;
                filesUrl.push(publicUrl);
                filesNameInMongo.push(file.originalname)
            }
        }
        const uploadFiles = await Task.findByIdAndUpdate(req.params.id, { files: filesNameInMongo }, { new: true })
        res.status(201).json({
            status: 'success',
            data: {
                files_url : filesUrl,
                uploadFiles,
            }
        })
    } catch (error) {
        console.error('Error in file upload:', error);
        return res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
}
const downloadFiles = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(400).json({
                status: 'fail',
                message: 'no task found'
            })
        }
        const fileName = task.files[req.params.index]
        const file = bucket.file(`uploads/${fileName}`)
        const [exist] = await file.exists()
        if(!exist){
            return res.status(400).json({
                status: 'fail',
                message: 'file no found in storage'
            })
        }
        const tempFilePath = path.join(__dirname.split('controller').join('uploads'),fileName)
        console.log(tempFilePath)
        await file.download({ destination: tempFilePath });
        res.download(tempFilePath,(err)=>{
            if(err){
                return  res.status(500).json({
                    status: 'fail download',
                    message: err.message
                })
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
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
