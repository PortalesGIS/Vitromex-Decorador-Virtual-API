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
    typologies:{
        type:"string",
    },
    color:{
        type:"string",
    },
    finish:{
        type:"string",
    },
    aplications:{
        type:Array,
    },
    idFromOracle:{
        type:"string",
    },
    dateCreated:{
        type:"string",
    },
    renders:{
        type:Array,
    }
})
ProductSchema.methods.toJSON = function(){
    const {idFromOracle, ...prod} = this.toObject();
    return prod;

}


module.exports = model("Product",ProductSchema);