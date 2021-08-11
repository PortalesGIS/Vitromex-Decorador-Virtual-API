const { response, json } = require("express");
const { burbuja } = require("../helpers/burbuja");
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
    await  fav.updateOne({total:parseInt(parseInt(fav.total))+1,dates:[...fav.dates,new Date().toISOString().slice(0,10)]})
    const user = await User.findById(userId)
    const {favorites} = user;
    favorites.push(productId)
    await user.updateOne({favorites})
    res.json({
        ok:true,
        msg:"Agregado correctamente"
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
        ok:true,
        msg:"Removido correctamente"
    })
}

const getAllFavoritesUser = async (req,res=response)=>{
    const {id} = req.params;
    const favorites  = await User.findById(id);
    res.json({
        favorites:favorites.favorites
    })
}

const getFavoritesList = async (req,res=response)=>{
    let list  = await Favorite.find({platform:"vitromex"}).where("total").gte(1).exec()
    list.sort(function (a, b) {
        if (a.total < b.total) {
          return 1;
        }
        if (a.total > b.total) {
          return -1;
        }
        return 0;
      });
    res.json({
        msg:"ok",
        list: list
    })
} 
const getFavoritesListArko = async (req,res=response)=>{
    const list  = await Favorite.find({platform:"arko"}).where("total").gte(1).exec()
    list.sort(function (a, b) {
        if (a.total < b.total) {
          return 1;
        }
        if (a.total > b.total) {
          return -1;
        }
        return 0;
      });
    res.json({
        msg:"ok",
        list: list
    })
} 


module.exports ={
    addPointFavorite,
    removePointFavorite,
    getAllFavoritesUser,
    getFavoritesList,
    getFavoritesListArko
}
