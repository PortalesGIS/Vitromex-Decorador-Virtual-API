const { Router } = require("express");
const { getAllShops, getAllShopsCMS } = require('../controllers/shop');


const router = Router();

router.get("/",getAllShops);

router.get("/cms",getAllShopsCMS);

module.exports = router;