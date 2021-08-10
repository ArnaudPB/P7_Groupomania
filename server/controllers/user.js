const bcrypt = require('bcrypt'); // encryption
const db = require('../models'); // model user
const jwt = require('jsonwebtoken'); // token generator package
const emailValidator = require('email-validator'); // email validator package
const passwordValidator = require('password-validator'); // password validator package
const config = require('../config');

exports.signup = async(req, res) => {
    try {
        const user = await db.User.findOne({
            where: { email: req.body.email } && { pseudo: req.body.pseudo },
        });
        if (user) {
            res.status(400).json({
                message: 'Cette adresse mail ou ce pseudo sont déjà utilisés !',
            });
        } else {
            const hash = await bcrypt.hash(req.body.password, 10);
            const newUser = await db.User.create({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash,
            });
            const userJson = await newUser.toJSON();

            res.status(201).json({
                user: userJson,
                token: jwt.sign(
                    // on génère un token de session pour le user maintenant connecté
                    { userId: userJson.id },
                    'JWT_SECRET', { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 }
                ),
                message: 'Votre compte est bien créé',
            });
        }
    } catch (error) {
        return res.status(500).send({ error: 'Erreur serveur' });
    }
};

exports.login = async(req, res, next) => {
    // connexion du user
    try {
        const user = await db.User.findOne({
                where: { email: req.body.email },
            }) // checking if mail address is in DB
            .then((user) => {
                if (user === null) {
                    return res.status(403).send({ error: 'Connexion échouée' });
                } else {
                    bcrypt
                        .compare(req.body.password, user.password) // on compare les mots de passes
                        .then((valid) => {
                            if (!valid) {
                                return res
                                    .status(401)
                                    .send({ error: 'Mot de passe incorrect !' });
                            }
                            user = user.toJSON();
                            res.status(200).json({
                                user: user,
                                token: jwt.sign(
                                    // on génère un token de session pour le user maintenant connecté
                                    { userId: user.id },
                                    'JWT_SECRET', { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 }
                                ),
                                message: 'Bonjour ' + user.pseudo + '!',
                            });
                        })
                        .catch((error) => res.status(500).json({ error }));
                }
            })
            .catch((error) => res.status(500).json({ error }));
    } catch (error) {
        return res.status(500).send({ error: 'Erreur serveur' });
    }
};
exports.getAccount = async(req, res) => {
    try {
        const user = await db.User.findOne({
            attributes: ['pseudo', 'email', 'photo'],
            where: { id: req.params.id }
        })
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).send({ error: 'Erreur serveur' });

    }
}
exports.getAllUsers = async(req, res) => {
    try {
        const user = await db.User.findAll();
        console.log(user)
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).send({ error: 'Erreur serveur' });
    }
}



exports.updateAccount = async(req, res) => {
    try {
        const id = req.params.id;
        /* const user = await models.Users.findOne({ where: { id: id } });
        console.log(user) */
        const userObject = req.file ? // on vérifie si la modification concerne le body ou un nouveau fichier image
            {
                ...JSON.parse(req.body),
                photo: `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`
            } : {...req.body };
        console.log(userObject);
        const response = await db.User.update(userObject, { where: { id: id } });
        res.status(200).json({ message: "profil modifié" });

    } catch (error) {
        return res.status(500).send({ error: 'Erreur serveur' });
    }
}