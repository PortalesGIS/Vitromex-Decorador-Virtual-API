const {Schema, model } = require('mongoose');

const AnalyticSchema = Schema({
    name:{
        type: 'string',
    },
    total:{
        type:Number,
    }
})

module.exports = model("Analytic",AnalyticSchema);