const { Router } = require("express");
const { getAllAplications, getAllTypologies, getAllTypologiesCMS } = require("../controllers/onboarding");
const { validateJwt } = require("../middlewares/validateJwt");

const router = Router();

router.get("/aplications",
    getAllAplications
);

router.get("/typologies",getAllTypologies)
router.get("/typologies/cms",getAllTypologiesCMS)
module.exports = router;