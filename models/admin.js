const {Schema, model } = require('mongoose');

const AdminSchema = Schema({
    name:{
        type: 'string',
    },
    email:{
        type: 'string',
    },
    status:{
        type:Boolean,
        default:true
    },
    dateCreated:{
        type:'string',
    }
})

module.exports = model("Admin",AdminSchema);