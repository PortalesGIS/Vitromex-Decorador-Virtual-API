const {Schema, model } = require('mongoose');

const FavoriteSchema = Schema({
    id:{
        type: 'string',
    },
    total:{
        type: Number,
    }

})

module.exports = model("Favorite",FavoriteSchema);