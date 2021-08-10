const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const authSignup = require('../middleware/authUser');
const authUser = require('../middleware/authUser');

router.post('/signup', authUser.signup, userCtrl.signup);
router.post('/login', authUser.signup, userCtrl.login);
//router.get('/:id', userCtrl.getOneUser);
//router.delete('/:id', userCtrl.deleteUser);

module.exports = router;