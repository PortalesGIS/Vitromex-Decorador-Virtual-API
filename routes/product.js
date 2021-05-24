const {Router} = require('express');
const { check } = require('express-validator');
const { productGet } = require('../controllers/product');

const router = Router();

router.get("/",productGet)

module.exports =router;