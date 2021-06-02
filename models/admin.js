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
    }
})

module.exports = model("Admin",AdminSchema);