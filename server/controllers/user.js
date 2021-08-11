const bcrypt = require("bcrypt"); // chiffrement du password
const db = require("../models"); // mdèles de la bdd
const token = require("../middleware/token"); // module qui génère le token
const fs = require("fs");
const { Op } = require("sequelize");

exports.signup = async(req, res) => {
    try {
        const user = await db.User.findOne({
            where: { email: req.body.email },
        });
        if (user !== null) {
            if (user.pseudo === req.body.pseudo) {
                return res.status(400).json({ error: "ce pseudo est déjà utilisé" });
            }
        } else {
            const hash = await bcrypt.hash(req.body.password, 10);
            const newUser = await db.User.create({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash,
                admin: false,
            });

            const tokenObject = await token.issueJWT(newUser);
            res.status(201).send({
                user: newUser,
                token: tokenObject.token,
                expires: tokenObject.expiresIn,
                message: `Votre compte est bien créé ${newUser.pseudo} !`,
            });
        }
    } catch (error) {
        return res.status(400).send({ error: "email déjà utilisé" });
    }
};

exports.login = async(req, res) => {
    try {
        const user = await db.User.findOne({
            where: { email: req.body.email },
        }); // on vérifie que l'adresse mail figure bien dan la bdd
        if (user === null) {
            return res.status(403).send({ error: "Connexion échouée" });
        } else {
            const hash = await bcrypt.compare(req.body.password, user.password); // on compare les mots de passes
            if (!hash) {
                return res.status(401).send({ error: "Mot de passe incorrect !" });
            } else {
                const tokenObject = await token.issueJWT(user);
                res.status(200).send({
                    // on renvoie le user et le token
                    user: user,
                    token: tokenObject.token,
                    sub: tokenObject.sub,
                    expires: tokenObject.expiresIn,
                    message: "Bonjour " + user.pseudo + " !",
                });
            }
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};
exports.getAccount = async(req, res) => {
    // on trouve l'utilisateur et on renvoie l'objet user
    try {
        const user = await db.User.findOne({
            where: { id: req.params.id },
        });
        res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};
exports.getAllUsers = async(req, res) => {
    // on envoie tous les users sauf admin
    try {
        const users = await db.User.findAll({
            attributes: ["pseudo", "id", "photo", "bio", "email"],
            where: {
                id: {
                    [Op.ne]: 1,
                },
            },
        });
        res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};
exports.updateAccount = async(req, res) => {
    // modifier le profil
    const id = req.params.id;
    try {
        const userId = token.getUserId(req);
        let newPhoto;
        let user = await db.User.findOne({ where: { id: id } }); // on trouve le user
        if (userId === user.id) {
            if (req.file && user.photo) {
                newPhoto = `${req.protocol}://${req.get("host")}/upload/${
          req.file.filename
        }`;
                const filename = user.photo.split("/upload")[1];
                fs.unlink(`upload/${filename}`, (err) => {
                    // s'il y avait déjà une photo on la supprime
                    if (err) console.log(err);
                    else {
                        console.log(`Deleted file: upload/${filename}`);
                    }
                });
            } else if (req.file) {
                newPhoto = `${req.protocol}://${req.get("host")}/upload/${
          req.file.filename
        }`;
            }
            if (newPhoto) {
                user.photo = newPhoto;
            }
            if (req.body.bio) {
                user.bio = req.body.bio;
            }
            if (req.body.pseudo) {
                user.pseudo = req.body.pseudo;
            }
            const newUser = await user.save({ fields: ["pseudo", "bio", "photo"] }); // on sauvegarde les changements dans la bdd
            res.status(200).json({
                user: newUser,
                messageRetour: "Votre profil a bien été modifié",
            });
        } else {
            res
                .status(400)
                .json({ messageRetour: "Vous n'avez pas les droits requis" });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};
exports.deleteAccount = async(req, res) => {
    try {
        const id = req.params.id;
        const user = await db.User.findOne({ where: { id: id } });
        if (user.photo !== null) {
            const filename = user.photo.split("/upload")[1];
            fs.unlink(`upload/${filename}`, () => {
                // sil' y a une photo on la supprime et on supprime le compte
                db.User.destroy({ where: { id: id } });
                res.status(200).json({ messageRetour: "utilisateur supprimé" });
            });
        } else {
            db.User.destroy({ where: { id: id } }); // on supprime le compte
            res.status(200).json({ messageRetour: "utilisateur supprimé" });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};