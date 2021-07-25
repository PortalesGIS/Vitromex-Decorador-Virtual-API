const {Schema, model } = require('mongoose');

const TypologiesSchema = Schema({
    name:{
        type: 'string',
        require:[true,"El nombre es requerido"]
    },
    img:{
        type: 'string',
    },
    dateCreated:{
        type: 'string',
    },
    platform:{
        type: 'string',
    },
})
TypologiesSchema.methods.toJSON = function(){
    const {__v,dateCreated, ...serie} = this.toObject();
    return serie;

}

module.exports = model("Typologies",TypologiesSchema);