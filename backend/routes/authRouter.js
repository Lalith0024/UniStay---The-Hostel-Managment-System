const {signup, login} = require('../controller/authController');
const {signupValidation,loginvalidation} = require('../middleware/authvalidation');

const router = require('express').Router();

router.post('/signup',signupValidation,signup);
router.post('/login',loginvalidation,login);

module.exports = router;
