const { Router } = require("express");
const { check } = require("express-validator");
const { getAllSeries, getAllSeriesCMS, uploadSerieImg, getAllSeriesArko, getAllSeriesCMSArko } = require("../controllers/serie");
const { validateCampos } = require("../middlewares/validateCampos");
const { validateJwt } = require("../middlewares/validateJwt");

const router = Router();

router.get("/",
getAllSeries
);
router.get("/cms",getAllSeriesCMS
);
router.get("/arko",
getAllSeriesArko
);
router.get("/cms/arko",getAllSeriesCMSArko
);

router.post("/upload-img",[
    validateJwt,
    check("id","No es un ID valido").isMongoId(),       
    validateCampos
],uploadSerieImg)

module.exports = router;