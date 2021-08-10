const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');

router.get('/posts', postsCtrl.getAllPosts);
router.post('/posts', postsCtrl.createPost);
router.get('/posts/:id', postsCtrl.getOnePost);
// router.put('/posts/:id', postsCtrl.updatePost);
// router.delete('/posts/:id', postsCtrl.deletePost);
//router.get('/posts/category/:id', postsCtrl.getPostsByCategory);
// router.post('/posts/:id', postsCtrl.commentPost);
//router.post('/posts/:id/like', postsCtrl.likePost);
//router.delete('/posts/:id/like', postsCtrl.dislikePost);
module.exports = router;