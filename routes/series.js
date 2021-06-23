const { Router } = require("express");
const { getAllSeries, getAllSeriesCMS } = require("../controllers/serie");

const router = Router();

router.get("/",
getAllSeries
);
router.get("/cms",
getAllSeriesCMS
);

module.exports = router;