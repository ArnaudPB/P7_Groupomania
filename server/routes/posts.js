const router = require('express').Router();
const postsCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/protected', auth, (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!" });
});

router.get('/', auth, postsCtrl.getAllPosts);
router.get('/hot', auth, postsCtrl.getHotPosts);
router.post('/add', auth, multer, postsCtrl.createPost);


router.get('/:id', auth, postsCtrl.getOnePost);
router.put('/:id', auth, multer, postsCtrl.updatePost);
router.delete('/:id', auth, multer, postsCtrl.deletePost);
//router.get('/posts/category/:id', postsCtrl.getPostsByCategory);
// router.post('/posts/:id', postsCtrl.commentPost);
router.post('/:id/like', auth, postsCtrl.likePost);
router.post('/:id/comments', auth, postsCtrl.addComment);
router.delete('/:id/comments/:comId', auth, postsCtrl.deleteComment);
module.exports = router;