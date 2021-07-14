const { Router } = require("express");
const { check } = require("express-validator");
const { getAllAplications, getAllTypologies, getAllTypologiesCMS, updateAplication, updateTypologies, createAplications, deleteAplication, deleteTypologie, createTypologie } = require("../controllers/onboarding");
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

router.post("/typologies/update",[
    validateJwt,
    check("id","No es un ID valido").isMongoId(),           
    validateCampos
], updateTypologies)

router.post("/aplications/create",[
    validateJwt,
    check("name","Es necesario un nombre").not().isEmpty(),   
    validateCampos,   
],createAplications)

router.post("/typologies/create",[
    validateJwt,
    check("name","Es necesario un nombre").not().isEmpty(),   
    validateCampos,   
],createTypologie)

router.delete("/aplications/delete",[
    validateJwt,
    check("id","No es un ID valido").isMongoId(),           
    validateCampos
],deleteAplication)

router.delete("/typlogies/delete",[
    validateJwt,
    check("id","No es un ID valido").isMongoId(),           
    validateCampos
],deleteTypologie)

module.exports = router;