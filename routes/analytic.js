const { Router } = require("express");
const { check } = require("express-validator");
const { addPointToPlatformNewDevice, addPointToSpaceSelected, getVisitsToPlatform } = require("../controllers/analytic");
const { validateCampos } = require("../middlewares/validateCampos");

const router = Router();

router.post('/newdevice',[
    check('platform','la plataforma del dispositivo es necesaria').not().isEmpty(),
    validateCampos
    ],
    addPointToPlatformNewDevice)

router.post('/visitspace',[
    check('space','se necesita un espacio').not().isEmpty(),
    validateCampos
], addPointToSpaceSelected)

router.get('/getTotal/:platform',[
    check("platform","la plataforma es necesaria").not().isEmpty(),
    validateCampos
    ],getVisitsToPlatform)

// router.get("/list",getCounterList)
// router.get("/list/arko",getCounterListArko)

// router.post('/add/:id',[
//     check("id","No es un ID valido").isMongoId(),
//     check("id","No es un ID valido").isMongoId(),
//     validateCampos
// ],addPointCounter)



module.exports = router;