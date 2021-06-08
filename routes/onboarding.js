const { Router } = require("express");
const { getAllAplications, getAllTypologies } = require("../controllers/onboarding");

const router = Router();

router.get("/aplications",
    getAllAplications
);

router.get("/typologies",getAllTypologies)
module.exports = router;