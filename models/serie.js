const {Schema, model } = require('mongoose');

const SerieSchema = Schema({
    name:{
        type: 'string',
        require:[true,"El nombre es requerido"]
    },
    img:{
        type: 'string',
    },
    
})


module.exports = model("Serie",SerieSchema);