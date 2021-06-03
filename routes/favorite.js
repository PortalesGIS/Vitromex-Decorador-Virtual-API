const { Router } = require("express");
const { check } = require("express-validator");
const { addPointFavorite, removePointFavorite, getAllFavoritesUser } = require("../controllers/favorite");
const { existFavoriteId,exitUserById } = require("../helpers/db-validators");
const { validateCampos } = require("../middlewares/validateCampos");

const router = Router();

router.post('/add/',[
    check("userId","No es un ID valido").isMongoId(),
    check("productId","No es un ID valido").isMongoId(),
    check("userId").custom(exitUserById),
    check("productId").custom(existFavoriteId),
    validateCampos
],addPointFavorite)

router.post('/remove/',[
    check("userId","No es un ID valido").isMongoId(),
    check("productId","No es un ID valido").isMongoId(),
    check("userId").custom(exitUserById),
    check("productId").custom(existFavoriteId),
    validateCampos
],removePointFavorite)

router.get('/:id',[
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(exitUserById),
    validateCampos
],getAllFavoritesUser)


module.exports = router;