const router = require('express').Router();
const userCtrl = require('../controllers/user');
const authSignup = require('../middleware/authUser');
const authUser = require('../middleware/authUser');

router.post('/signup', authUser.signup, userCtrl.signup);
router.post('/login', authUser.signup, userCtrl.login);
router.get('/accounts', userCtrl.getAllUsers);
router.put('/accounts/:id', userCtrl.updateAccount);
router.get('/accounts/:id', userCtrl.getAccount);
//router.delete('/:id', userCtrl.deleteUser);

module.exports = router;