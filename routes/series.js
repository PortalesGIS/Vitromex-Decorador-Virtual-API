const { Router } = require("express");
const { getAllSeries } = require("../controllers/serie");

const router = Router();

router.get("/",
getAllSeries
);

module.exports = router;