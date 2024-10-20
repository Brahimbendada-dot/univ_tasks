const express = require('express')
const { createTask, getAllTasks, getOneTask, updateTask, deleteTask, uploadFiles, addReview, getAllTasksOfSpecificModule, downloadFiles } = require('../controller/task_controller')
const { uploads } = require('../middlware/upload_middleware')
const { verifyToken } = require('../middlware/verifyToken')



const router = express.Router()

router.post('/', verifyToken, createTask)
router.get('/', getAllTasks)
router.get('/:id', getOneTask)
router.put('/:id', verifyToken, updateTask)
router.delete('/:id',verifyToken, deleteTask)
router.post('/uploads/:id', verifyToken,uploads.array('files',10), uploadFiles)
router.put('/reviews/:id', addReview)
router.get('/moduletasks/:id', getAllTasksOfSpecificModule)
router.get('/downloadFiles/:id/:index',downloadFiles)

module.exports= router