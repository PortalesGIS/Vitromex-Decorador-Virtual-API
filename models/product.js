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
    smallPicture:{
        type: 'string',
    },
    available:{
        type:Boolean,
        default:true
    },
    isNewProduct:{
        type:Boolean,
        default:false
    },
    family:{
        type:"string"
    },
    branding:{
        type:"string"
    },
    textureHeight:{
        type: Number,
    },
    textureWidth:{
        type: Number,
        
    },

})

module.exports = model("Product",ProductSchema);