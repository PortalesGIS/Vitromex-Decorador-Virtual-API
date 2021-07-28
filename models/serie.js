const {Schema, model } = require('mongoose');

const SerieSchema = Schema({
    name:{
        type: 'string',
        require:[true,"El nombre es requerido"]
    },
    available:{
        type:Boolean,
        default:true
    },
    img:{
        type: 'string',
    },
    render:{
        type: 'string'
    },
    dateCreated:{
        type: 'string',
    },
    typologie:{
        type: 'string',
    },
    platform:{
        type: 'string',
    }
    
})
SerieSchema.methods.toJSON = function(){
    const {__v,dateCreated,platform,available, ...serie} = this.toObject();
    return serie;

}

module.exports = model("Serie",SerieSchema);