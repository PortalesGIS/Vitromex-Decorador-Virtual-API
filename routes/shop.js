const { Router } = require("express");
const { getAllShops, getAllShopsCMS } = require('../controllers/shop');
const { validateJwt } = require("../middlewares/validateJwt");


const router = Router();

router.get("/",getAllShops);

router.get("/cms",getAllShopsCMS);

module.exports = router;