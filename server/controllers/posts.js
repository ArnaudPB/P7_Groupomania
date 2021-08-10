const models = require('../models');
const token = require('../middleware/token');



exports.getAllPosts = async(req, res) => {
    try {
        const posts = await models.Post.findAll({
            include: [
                db.User
            ]
        });
        console.log(posts)
        res.status(200).send(posts);
    } catch (error) {
        return res.status(500).send({ error: 'Erreur serveur' });
    }
}
exports.getOnePost = async(req, res) => {
    try {
        const id = req.params.id;
        const post = await models.Post.findOne({
            attributes: ['id', 'message', 'link', 'userId'],
            where: { id: req.params.id }
        })
        res.status(200).json(post);
    } catch (error) {
        return res.status(500).send({ error: 'Erreur serveur' });

    }
}
exports.createPost = (req, res) => {

    const userId = token.getUserId(req)
    console.log(userId)

    let imageUrl
    models.User.findOne({
            attributes: ['pseudo', 'id', 'photo'],
            where: { id: userId }
        })
        .then(user => {
            console.log(user)
            if (req.file) {
                imageUrl = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`
            } else {
                imageUrl = null;
            }
            models.Post.create({
                    message: req.body.message,
                    link: req.body.link,
                    imageUrl: imageUrl,
                    UserId: user.id
                })
                .then(newPost => {
                    console.log(newPost)
                    res.status(201).send(newPost)

                })
                .catch(err => {
                    res.status(400).send({ error: 'Erreur ' });
                })
        })
        .catch(err => {
            res.status(500).send({ error: 'Erreur serveur' });
        })
};
//exports.deletePost = (req, res, next) =>