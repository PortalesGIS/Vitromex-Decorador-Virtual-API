const {Schema, model } = require('mongoose');

const CounterSchema = Schema({
    id:{
        type: 'string',
    },
    total:{
        type: Number,
    }

})

module.exports = model("Counter",CounterSchema);