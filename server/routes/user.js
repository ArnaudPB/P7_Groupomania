const router = require('express').Router();
const userCtrl = require('../controllers/user');
const authUser = require('../middleware/authUser');
const multer = require('../middleware/multer-config');

const auth = require('../middleware/auth');

router.post('/signup', authUser.checkPseudo, authUser.signup, userCtrl.signup);
router.post('/login', authUser.signup, userCtrl.login);
router.get('/accounts', auth, userCtrl.getAllUsers);
router.put('/accounts/:id', auth, multer, userCtrl.updateAccount);
router.get('/accounts/:id', auth, userCtrl.getAccount);
//router.delete('/:id', userCtrl.deleteUser);

module.exports = router;