const express = require('express')
const { createModule, getAllModules, getOneModule, updateModule, deleteModule } = require('../controller/module_controller')



const router = express.Router()

router.post('/', createModule )
router.get('/', getAllModules)
router.get('/:id', getOneModule)
router.put('/:id', updateModule)
router.delete('/:id', deleteModule)


module.exports= router