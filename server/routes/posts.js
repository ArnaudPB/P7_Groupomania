const router = require("express").Router();
const postsCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", auth, postsCtrl.getAllPosts);
router.get("/hot", auth, postsCtrl.getHotPosts);
router.post("/add", auth, multer, postsCtrl.createPost);
router.get("/:id", auth, postsCtrl.getOnePost);
router.put("/:id", auth, multer, postsCtrl.updatePost);
router.delete("/:id", auth, multer, postsCtrl.deletePost);
router.post("/:id/like", auth, postsCtrl.likePost);
router.post("/:id/comments", auth, postsCtrl.addComment);
router.delete("/comments/:id", auth, postsCtrl.deleteComment);
module.exports = router;