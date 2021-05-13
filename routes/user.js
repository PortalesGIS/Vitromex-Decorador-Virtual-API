
const {Router} = require('express');
const { userGet, userPost, userDelete } = require('../controllers/user');


const router = Router();

router.get('/',userGet)

router.post('/',userPost)
// 
router.delete('/',userDelete)

module.exports =router;