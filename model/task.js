const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    files:{
        type: Array,
        default:[]
    },
    module:{
        type: mongoose.Types.ObjectId,
        ref:'Module',
    },
    review:{
        type:Array,
        default:[]
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Task', taskSchema)