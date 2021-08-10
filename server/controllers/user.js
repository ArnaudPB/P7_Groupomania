const bcrypt = require('bcrypt'); // encryption
const models = require('../models'); // model user
const jwt = require('jsonwebtoken'); // token generator package
const emailValidator = require('email-validator'); // email validator package
const passwordValidator = require('password-validator'); // password validator package
const config = require('../config/config.json');

exports.signup = async(req, res) => {
    try {
        const user = await models.Users.findOne({
            where: { email: req.body.email } && { pseudo: req.body.pseudo },
        });
        if (user) {
            res.status(400).json({
                message: 'Cette adresse mail ou ce pseudo sont déjà utilisés !',
            });
        } else {
            const hash = await bcrypt.hash(req.body.password, 10);
            const newUser = await models.Users.create({
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
        const user = await models.Users.findOne({
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