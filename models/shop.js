const {Schema, model } = require('mongoose');

const ShopSchema = Schema({
    name:{
        type: 'string',
    },
    country:{
        type: 'string',
    },
    state:{
        type: 'string',
    },
    city:{
        type: 'string',
    },
    suburb:{
        type: 'string',
    },
    street:{
        type: 'string',
    },
    num:{
        type: 'string',
    },
    phone:{
        type: 'string',
    },
    status:{
        type:Boolean,
        default:true
    },
    lat: {
        type: 'string',
    },
    lng:{
        type: 'string',
    },
    dateCreated:{
        type: 'string',
    }

})

ShopSchema.methods.toJSON = function(){
    const {dateCreated, ...shops} = this.toObject();
    return shops;

}

module.exports = model("Shop",ShopSchema);