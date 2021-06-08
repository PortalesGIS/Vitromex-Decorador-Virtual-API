const {Schema, model } = require('mongoose');

const AplicationsSchema = Schema({
    name:{
        type: 'string',
        require:[true,"El nombre es requerido"]
    },
    img:{
        type: 'string',
    },
    
})


module.exports = model("Aplications",AplicationsSchema);