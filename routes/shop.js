const { Router } = require("express");
const { getAllShops } = require('../controllers/shop');


const router = Router();

router.get("/",getAllShops);

module.exports = router;