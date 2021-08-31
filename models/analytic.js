const {Schema, model } = require('mongoose');

const AnalyticSchema = Schema({
    name:{
        type: 'string',
    },
    total:{
        type:Number,
    },
    platform:{
        type: 'string',
    },
    objectSpaces:{}
})

module.exports = model("Analytic",AnalyticSchema);