const bcrypt = require('bcrypt'); // chiffrement
const models = require('../models'); // modele user
const jwt = require('jsonwebtoken'); // token generator package
const emailValidator = require('email-validator'); // email validator package
const passwordValidator = require('password-validator'); // password validator package

exports.signup = (req, res) => {
    models.Users.findOne({
            where: { email: req.body.email } && { pseudo: req.body.pseudo },
        })
        .then((user) => {
            if (!user) {
                bcrypt
                    .hash(req.body.password, 10)
                    .then((hash) => {
                        models.Users.create({
                            pseudo: req.body.pseudo,
                            email: req.body.email,
                            password: hash,
                        });
                    })
                    .then((newUser) =>
                        res.status(201).json({
                            message: 'Utilisateur créé : ',
                        })
                    )
                    .catch(() => res.status(500).json({ message: 'erreur !' }));
            } else {
                res.status(400).json({
                    message: 'Cette adresse mail ou ce pseudo sont déjà utilisés !',
                });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.login = async(req, res, next) => {
    // connexion du user
    try {
        const user = await models.Users.findOne({
                where: { pseudo: req.body.pseudo },
            }) // on vérifie que l'adresse mail figure bien dan la bdd
            .then((user) => {
                if (user === null) {
                    return res.status(401).json({ error: 'Utilisateur non trouvé !' });
                } else {
                    bcrypt
                        .compare(req.body.password, user.password) // on compare les mots de passes
                        .then((valid) => {
                            if (!valid) {
                                return res
                                    .status(401)
                                    .json({ error: 'Mot de passe incorrect !' });
                            }
                            res.status(200).json({
                                userId: user.id,
                                token: jwt.sign(
                                    // on génère un token de session pour le user maintenant connecté
                                    { userId: user.id },
                                    'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                                ),
                            });
                        })
                        .catch((error) => res.status(500).json({ error }));
                }
            })
            .catch((error) => res.status(500).json({ error }));
    } catch (error) {
        return res.status(500).json({ error });
    }
};