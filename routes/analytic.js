const { Router } = require("express");
const { check } = require("express-validator");
const { addPointToPlatformNewDeviceVitromex,
     addPointToSpaceSelectedVitromex,
      getVisitsToPlatform,
      getVisitsToPlatformArko,
       addPointToPlatformNewDeviceARko, 
       addPointToSpaceSelectedArko,
       getSpacesMoreVisitedarko,
       getSpacesMoreVisitedVitromex} = require("../controllers/analytic");
const { validateCampos } = require("../middlewares/validateCampos");

const router = Router();

router.post('/newdevice/vitromex',[
    check('platform','la plataforma del dispositivo es necesaria').not().isEmpty(),
    validateCampos
    ],
    addPointToPlatformNewDeviceVitromex)
router.post('/newdevice/arko',[
    check('platform','la plataforma del dispositivo es necesaria').not().isEmpty(),
    validateCampos
    ],
    addPointToPlatformNewDeviceARko)

router.post('/visitspace/vitromex',[
    check('space','se necesita un espacio').not().isEmpty(),
    validateCampos
], addPointToSpaceSelectedVitromex)

router.post('/visitspace/arko',[
    check('space','se necesita un espacio').not().isEmpty(),
    validateCampos
], addPointToSpaceSelectedArko)

router.get('/countspaces/arko',
getSpacesMoreVisitedarko    
)
router.get('/countspaces/vitromex',
getSpacesMoreVisitedVitromex   
)


router.get('/getTotal/vitromex/:platform',[
    check("platform","la plataforma es necesaria").not().isEmpty(),
    validateCampos
    ],getVisitsToPlatform)
router.get('/getTotal/arko/:platform',[
    check("platform","la plataforma es necesaria").not().isEmpty(),
    validateCampos
    ],getVisitsToPlatformArko)

// router.get("/list",getCounterList)
// router.get("/list/arko",getCounterListArko)

// router.post('/add/:id',[
//     check("id","No es un ID valido").isMongoId(),
//     check("id","No es un ID valido").isMongoId(),
//     validateCampos
// ],addPointCounter)



module.exports = router;