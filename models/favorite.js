const {Schema, model } = require('mongoose');

const FavoriteSchema = Schema({
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

module.exports = model("Favorite",FavoriteSchema);