const db = require('../models'); // accès tables



exports.getAllPosts = async(req, res) => {
    try {
        const posts = await db.Post.findAll({
            include: [
                db.User
            ]
        });
        console.log(posts)
        res.status(200).json(posts);
    } catch (error) {
        return res.status(500).send({ error: 'Erreur serveur' });
    }
}
exports.getOnePost = async(req, res) => {
    try {
        const id = req.params.id;
        const post = await db.Post.findOne({
            attributes: ['id', 'message', 'link', 'userId'],
            where: { id: req.params.id }
        })
        res.status(200).json(post);
    } catch (error) {
        return res.status(500).send({ error: 'Erreur serveur' });

    }
}
exports.createPost = async(req, res) => {
    try {
        const post = await db.Post.create({
            title: req.body.title,
            message: req.body.message,
            link: req.body.link,
            imageUrl: req.body.url,
            UserId: req.body.userId
        })
        res.status(201).json(post);
        console.log('post:', JSON.stringify(post));
        //const postJson = await post.toJSON();
        // res.status(200).json({ postJson });
        /*  console.log(
          postJson.title,
          postJson.message,
          postJson.url,
          postJson.user_id
        ); */
    } catch (error) {
        return res.status(500).send({ error: 'Une erreur est survenue lors de la création du post' });
    }
};