const express = require('express')
const { createModule, getAllModules, getOneModule, updateModule, deleteModule } = require('../controller/module_controller')
const { verifyToken } = require('../middlware/verifyToken')



const router = express.Router()

router.post('/', verifyToken,createModule )
router.get('/' ,getAllModules)
router.get('/:id', getOneModule)
router.put('/:id',verifyToken, updateModule)
router.delete('/:id', verifyToken ,deleteModule)


module.exports= router