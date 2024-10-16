const mongoose = require('mongoose')

const moduleSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Module', moduleSchema)