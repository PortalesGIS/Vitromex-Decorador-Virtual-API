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
    }

})

module.exports = model("Shop",ShopSchema);