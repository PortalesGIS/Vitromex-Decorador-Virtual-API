const {Schema, model } = require('mongoose');

const CounterSchema = Schema({
    id:{
        type: 'string',
    },
    total:{
        type: Number,
    },
    dates:{
        type:Array,
    },
    platform:{
        type: 'string',
    }
})

module.exports = model("Counter",CounterSchema);