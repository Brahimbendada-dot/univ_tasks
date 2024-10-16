const express = require('express')
const { createTask, getAllTasks, getOneTask, updateTask, deleteTask, uploadFiles, addReview, getAllTasksOfSpecificModule, downloadFiles } = require('../controller/task_controller')
const { uploads } = require('../middlware/upload_middleware')



const router = express.Router()

router.post('/', createTask)
router.get('/', getAllTasks)
router.get('/:id', getOneTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)
router.post('/uploads/:id', uploads.array('files',10), uploadFiles)
router.put('/reviews/:id', addReview)
router.get('/moduletasks/:id', getAllTasksOfSpecificModule)
router.get('/downloadFiles/:id/:index', downloadFiles)

module.exports= router