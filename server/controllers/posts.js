const token = require("../middleware/token");
const db = require("../models"); // accès tables
const fs = require("fs"); //

const paranoid = require("paranoid");

exports.getAllPosts = async(req, res) => {
    try {
        const posts = await db.Post.findAll({
            attributes: ["id", "message", "imageUrl", "link", "createdAt"],
            order: [
                ["createdAt", "DESC"]
            ],
            include: [{
                    model: db.User,
                    attributes: ["pseudo", "id", "photo"],
                },
                {
                    model: db.Like,
                    attributes: ["UserId"],
                },
                {
                    model: db.Comment,
                    attributes: ["message", "pseudo", "UserId", "id"],
                    order: [
                        ["createdAt", "DESC"]
                    ],
                    include: [{
                        model: db.User,
                        attributes: ["photo", "pseudo"],
                    }, ],
                },
            ],
        });
        res.status(200).send(posts);
    } catch (error) {

        console.log(error);

        return res.status(500).send({
            error: "Une erreur est survenu lors de la récupération des posts ",
        });
    }
};
// afficher le sposts les plus likés
exports.getHotPosts = async(req, res) => {
    try {
        const posts = await db.Post.findAll({
            attributes: [
                "id",
                "message",
                "imageUrl",
                "link",
                "createdAt", [
                    db.sequelize.literal(
                        "(SELECT COUNT(*) FROM Likes WHERE Likes.PostId = Post.id)"
                    ),
                    "LikeCount",
                ],
            ],
            order: [
                [db.sequelize.literal("LikeCount"), "DESC"]
            ],

            include: [{
                    model: db.User,
                    attributes: ["pseudo", "id", "photo"],
                },
                {
                    model: db.Like,
                    attributes: ["PostId", "UserId"],
                },
                {
                    model: db.Comment,
                    order: [
                        ["createdAt", "DESC"]
                    ],
                    attributes: ["message", "pseudo", "UserId", "id"],
                    include: [{
                        model: db.User,
                        attributes: ["photo", "pseudo"],
                    }, ],
                },
            ],
        });
        res.status(200).send(posts);
    } catch (error) {
        return res.status(500).send({
            error: "Une erreur est survenu lors de la récupération des posts ",
        });
    }
};
exports.getOnePost = async(req, res) => {
    try {
        const post = await db.Post.findOne({
            // on récupère le post avec l'id fourni en incluant les tables et attributs nécessaires
            where: { id: req.params.id },
            include: [{
                    model: db.User,
                    attributes: ["pseudo", "photo", "id"],
                },
                {
                    model: db.Like,
                    attributes: ["PostId", "UserId"],
                },
                {
                    model: db.Comment,
                    order: [
                        ["createdAt", "DESC"]
                    ],
                    attributes: ["message", "pseudo", "UserId"],
                    include: [{
                        model: db.User,
                        attributes: ["photo", "pseudo"],
                    }, ],
                },
            ],
        });
        res.status(200).json(post);
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};
exports.createPost = async(req, res) => {
    const userId = token.getUserId(req);
    let imageUrl;
    try {
        const user = await db.User.findOne({
            attributes: ["pseudo", "id", "photo"],
            where: { id: userId },
        });
        if (user !== null) {
            if (req.file) {
                imageUrl = `${req.protocol}://${req.get("host")}/upload/${
          req.file.filename
        }`;
            } else {
                imageUrl = null;
            }
            const post = await db.Post.create({
                include: [{
                    model: db.User,
                    attributes: ["pseudo", "photo", "id"],
                }, ],
                message: req.body.message,
                link: req.body.link,
                imageUrl: imageUrl,
                UserId: user.id,
            });

            res
                .status(201)
                .json({ post: post, messageRetour: "Votre post est ajouté" });
        } else {
            res.status(400).send({ error: "Erreur " });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};
exports.deletePost = async(req, res) => {
    try {
        const userId = token.getUserId(req);
        const checkAdmin = await db.User.findOne({ where: { id: userId } });
        const post = await db.Post.findOne({ where: { id: req.params.id } });

        if (userId === post.UserId || checkAdmin.admin === true) {
            if (post.imageUrl) {
                const filename = post.imageUrl.split("/upload")[1];
                const postId = req.params.id;
                const user = db.Like.findOne({
                    where: { PostId: postId },
                });
                if (user) {
                    db.Like.destroy({ where: { PostId: postId } }, { truncate: true, restartIdentity: true });
                    // db.Comment.destroy({ where: { id: req.params.id } }, { truncate: true });
                    res.status(200).send({ messageRetour: "vou n'aimez plus ce post" });
                }
                fs.unlink(`upload/${filename}`, () => {
                    db.Post.destroy({ where: { id: post.id } });
                    res.status(200).json({ message: "Post supprimé" });
                });
            } else {

                const postId = req.params.id;
                const user = db.Like.findOne({
                    where: { PostId: postId },
                });
                if (user) {
                    db.Like.destroy({ where: { PostId: postId } }, { truncate: true, restartIdentity: true });
                    // db.Comment.destroy({ where: { id: req.params.id } }, { truncate: true });
                    res.status(200).send({ messageRetour: "vou n'aimez plus ce post" });
                }

                // db.Comment.destroy({ where: { id: req.params.id } }, { truncate: true });
                // res.status(200).json({ message: "commentaire supprimé" });

                await db.Post.destroy({ where: { id: post.id } }, { truncate: true });
                res.status(200).json({ message: "Post supprimé" });
            }

        } else {
            res.status(400).json({ message: "Vous n'avez pas les droits requis" });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};

exports.updatePost = async(req, res) => {
    try {
        let newImageUrl;
        const userId = token.getUserId(req);
        let post = await db.Post.findOne({ where: { id: req.params.id } });
        if (userId === post.UserId) {
            if (req.file) {
                newImageUrl = `${req.protocol}://${req.get("host")}/upload/${
          req.file.filename
        }`;
                if (post.imageUrl) {
                    const filename = post.imageUrl.split("/upload")[1];
                    fs.unlink(`upload/${filename}`, (err) => {
                        if (err) console.log(err);
                        else {
                            console.log(`Deleted file: upload/${filename}`);
                        }
                    });
                }
            }
            if (req.body.message) {
                post.message = req.body.message;
            }
            post.link = req.body.link;
            post.imageUrl = newImageUrl;
            const newPost = await post.save({
                fields: ["message", "link", "imageUrl"],
            });
            res.status(200).json({ newPost: newPost, messageRetour: "post modifié" });
        } else {
            res.status(400).json({ message: "Vous n'avez pas les droits requis" });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};

exports.likePost = async(req, res, next) => {
    try {
        const userId = token.getUserId(req);
        const postId = req.params.id;
        const user = await db.Like.findOne({
            where: { UserId: userId, PostId: postId },
        });
        if (user) {
            await db.Like.destroy({ where: { UserId: userId, PostId: postId } }, { truncate: true, restartIdentity: true });
            res.status(200).send({ messageRetour: "vou n'aimez plus ce post" });
        } else {
            await db.Like.create({
                UserId: userId,
                PostId: postId,
            });
            res.status(201).json({ messageRetour: "vous aimez ce post" });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};
exports.addComment = async(req, res) => {
    try {
        const comment = req.body.commentMessage;
        const pseudo = req.body.commentPseudo;
        const newComment = await db.Comment.create({
            message: comment,
            pseudo: pseudo,
            UserId: token.getUserId(req),
            PostId: req.params.id,
        });

        res
            .status(201)
            .json({ newComment, messageRetour: "votre commentaire est publié" });
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};
exports.deleteComment = async(req, res) => {
    try {
        const userId = token.getUserId(req);
        const checkAdmin = await db.User.findOne({ where: { id: userId } });
        const comment = await db.Comment.findOne({ where: { id: req.params.id } });

        if (userId === comment.UserId || checkAdmin.admin === true) {
            db.Comment.destroy({ where: { id: req.params.id } }, { truncate: true });
            res.status(200).json({ message: "commentaire supprimé" });
        } else {
            res.status(400).json({ message: "Vous n'avez pas les droits requis" });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};