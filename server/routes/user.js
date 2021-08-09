const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const authSignup = require('../middleware/authSignup');

router.post('/signup', authSignup.signup, userCtrl.signup);
router.post('/login', userCtrl.login);
//router.get('/:id', userCtrl.getOneUser);
//router.delete('/:id', userCtrl.deleteUser);

module.exports = router;