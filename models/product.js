const {Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name:{
        type: 'string',
        require:[true,"El nombre es requerido"]
    },
    albedo:{
        type: 'string',
    },
    normal:{
        type: 'string',
    },
    roughness:{
        type: 'string',
    },
    sized:{
        type: 'string',
    },
    abailable:{
        type:Boolean,
        default:true
    }
})

module.exports = model("Product",ProductSchema);