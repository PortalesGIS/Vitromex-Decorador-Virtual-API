const { Router } = require("express");
const { check } = require("express-validator");
const { getAllAplications, getAllTypologies, getAllTypologiesCMS, updateAplication } = require("../controllers/onboarding");
const { validateCampos } = require("../middlewares/validateCampos");
const { validateJwt } = require("../middlewares/validateJwt");

const router = Router();

router.get("/aplications",
    getAllAplications
);

router.get("/typologies",getAllTypologies)
router.get("/typologies/cms",getAllTypologiesCMS)

router.post("/aplications/update",[
    validateJwt,
    check("id","No es un ID valido").isMongoId(),           
    validateCampos
],
updateAplication
)
module.exports = router;