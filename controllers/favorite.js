const { response } = require("express");
const Favorite = require("../models/favorite");
const User = require("../models/user");

const addPointFavorite = async(req,res=response)=>{
    const {userId, productId} = req.body;

    const state = await User.findById(userId)
    if(state.favorites.find((x)=>x===productId)){
        return res.status(400).json({
            ok:false,
            msg:"el usuario ya lo tiene en favoritos"
        })
    }
    

    const fav = await Favorite.findById(productId);
    await  fav.updateOne({total:fav.total+1})

    const user = await User.findById(userId)
    const {favorites} = user;
    favorites.push(productId)
    await user.updateOne({favorites})
    res.json({
        ok:true
    })
}

const removePointFavorite = async (req,res=response)=>{
    const {userId, productId} = req.body;

    const state = await User.findById(userId)
    if(!state.favorites.find((x)=>x===productId)){
        return res.status(400).json({
            ok:false,
            msg:"el usuario NO lo tiene en favoritos"
        })
    }
    

    const fav = await Favorite.findById(productId);
    await  fav.updateOne({total:fav.total-1})

    const user = await User.findById(userId)
    const {favorites} = user;
    favorites.remove(productId)
    await user.updateOne({favorites})
    res.json({
        ok:true
    })
}

module.exports ={
    addPointFavorite,
    removePointFavorite
}
