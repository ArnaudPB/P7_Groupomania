const router = require('express').Router();
const postsCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/protected', auth, (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!" });
});

router.get('/posts', auth, postsCtrl.getAllPosts);
router.post('/posts/add', multer, postsCtrl.createPost);

router.get('/posts/:id', auth, postsCtrl.getOnePost);
// router.put('/posts/:id', postsCtrl.updatePost);
router.delete('/posts/:id', auth, postsCtrl.deletePost);
//router.get('/posts/category/:id', postsCtrl.getPostsByCategory);
// router.post('/posts/:id', postsCtrl.commentPost);
//router.post('/posts/:id/like', postsCtrl.likePost);
//router.delete('/posts/:id/like', postsCtrl.dislikePost);
module.exports = router;