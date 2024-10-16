const Module = require('../model/module')

const createModule = async (req,res)=>{
    const newModule = new Module(req.body)
    try {
        const  module = await newModule.save()
        res.status(201).json({
            status:"success",
            data:{
                module
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}
const getAllModules = async (req,res)=>{
    try {
        const  modules = await Module.find({})
        res.status(200).json({
            status:"success",
            data:{
                modules
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}
const getOneModule = async (req,res)=>{
    try {
        const  module = await Module.findById(req.params.id)
        res.status(200).json({
            status:"success",
            data:{
                module
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}
const updateModule = async (req,res)=>{
    try {
        const  module = await Module.findByIdAndUpdate(req.params.id, req.body,{new:true})
        res.status(200).json({
            status:"success",
            data:{
                module
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}
const deleteModule = async (req,res)=>{
    try {
        await Module.findByIdAndDelete(req.params.id)
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

module.exports = {
    createModule,
    getAllModules,
    updateModule,
    deleteModule,
    getOneModule,
}