const { Router } = require("express");
const { check } = require("express-validator");
const { addPointCounter, getCounterList } = require("../controllers/counter");
const { validateCampos } = require("../middlewares/validateCampos");

const router = Router();

router.get("/list",getCounterList)

router.post('/add/:id',[
    check("id","No es un ID valido").isMongoId(),
    check("id","No es un ID valido").isMongoId(),
    validateCampos
],addPointCounter)


module.exports = router;