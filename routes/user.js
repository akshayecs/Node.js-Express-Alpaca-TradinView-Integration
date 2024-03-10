
const router = require('express').Router();
const userController = require('../controller/user');
const verifySignUp = require('../middleware/authentication');



router.post('/register',verifySignUp,userController.userSignUp);
router.post('/login',userController.userLogin);

module.exports = router;