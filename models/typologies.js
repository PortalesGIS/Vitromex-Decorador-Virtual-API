const {Schema, model } = require('mongoose');

const TypologiesSchema = Schema({
    name:{
        type: 'string',
        require:[true,"El nombre es requerido"]
    },
    img:{
        type: 'string',
    },
    
})


module.exports = model("Typologies",TypologiesSchema);