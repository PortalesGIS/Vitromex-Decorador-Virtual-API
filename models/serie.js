const {Schema, model } = require('mongoose');

const SerieSchema = Schema({
    name:{
        type: 'string',
        require:[true,"El nombre es requerido"]
    },
    img:{
        type: 'string',
    },
    render:{
        type: 'string'
    }
    
})
SerieSchema.methods.toJSON = function(){
    const {__v, ...serie} = this.toObject();
    return serie;

}

module.exports = model("Serie",SerieSchema);