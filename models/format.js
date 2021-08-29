const {Schema, model } = require('mongoose');

const FormatSchema = Schema({
    id:{
        type: 'string',
    },
    rounded:{
        type: 'string',
    }
})

module.exports = model("Format",FormatSchema);