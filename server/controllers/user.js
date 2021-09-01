const bcrypt = require("bcrypt"); // chiffrement du password
const db = require("../models"); // mdèles de la bdd
const token = require("../middleware/token"); // module qui génère le token
const fs = require("fs");
const { Op } = require("sequelize");
const cryptojs = require('crypto-js');

require('dotenv').config();

let persist_info = require("./pesist.json");
const { deletePost } = require("./posts");

// var bfs = require('browserify-fs');

exports.signup = async(req, res) => {
    try {
        const cryptedResearchedEmail = cryptojs.HmacSHA256(req.body.email, process.env.EMAIL_KEY).toString();



        const user = await db.User.findOne({
            where: {
                email: cryptedResearchedEmail
            },
        });

        // console.log("C KI ? " + user.email)

        if (user !== null) {
            if (user.pseudo === req.body.pseudo) {
                return res.status(400).json({ error: "ce pseudo est déjà utilisé" });
            }
        } else {
            const hash = await bcrypt.hash(req.body.password, 10);

            // const newUser = await db.User.create({
            //     pseudo: req.body.pseudo,
            //     email: req.body.email,
            //     password: hash,
            //     admin: false,
            // });

            const newUser = await db.User.create({
                pseudo: req.body.pseudo,
                email: cryptojs.HmacSHA256(req.body.email, process.env.EMAIL_KEY).toString(),
                password: hash,
                admin: false,
            });

            // cryptojs.HmacSHA256(req.body.email, process.env.EMAIL_KEY).toString(),

            const tokenObject = await token.issueJWT(newUser);
            res.status(201).send({
                user: newUser,
                token: tokenObject.token,
                expires: tokenObject.expiresIn,
                message: `Votre compte est bien créé ${newUser.pseudo} !`,
            });
        }
    } catch (error) {
        // const cryptedResearchedEmail = cryptojs.HmacSHA256(req.body.email, process.env.EMAIL_KEY).toString();

        console.error(error);

        return res.status(400).send({ error: "email déjà utilisé" });
    }
};

exports.login = async(req, res) => {

    //faudrait faire un logout_token
    // si l'user se logout le token = true
    // sinon on recupère le mail + mdp + page sur laquelle est l'user, qu'on met dans un txt, et on charge l'user depuis là


    // var data = CryptoJS.AES.encrypt(message, key);
    // data = data.toString()

    // var decr = CryptoJS.AES.decrypt(data, key);
    // decr = decr.toString(CryptoJS.enc.Utf8);

    // const LoggedUser = await db.User.findOne({ where: { is_logged: 1 } })

    try {



        const CheckRightMail = await db.User.findOne({ where: { email: cryptojs.HmacSHA256(req.body.email, process.env.EMAIL_KEY).toString() } })
            // const CheckRightMail = await db.User.findOne({ where: { email: req.body.email } })

        const RightMail = CheckRightMail ? CheckRightMail.email : req.body.email

        console.log("THE USER " + CheckRightMail);


        const user = await db.User.findOne({
            where: { email: RightMail },
        }); // on vérifie que l'adresse mail figure bien dan la bdd

        if (user === null) {
            return res.status(403).send({ error: "Connexion échouée" });
        } else {
            const hash = await bcrypt.compare(req.body.password, user.password); // on compare les mots de passes
            if (!hash) {
                return res.status(401).send({ error: "Mot de passe incorrect !" + user.email });
            } else {
                //persist_info["mail"] = "alors ?";

                const tokenObject = await token.issueJWT(user);


                res.status(200).send({
                    // on renvoie le user et le token
                    user: user,
                    token: tokenObject.token,
                    sub: tokenObject.sub,
                    expires: tokenObject.expiresIn,
                    message: "Bonjour " + user.pseudo + " !",
                });


                //persist_info.mdp = "test";
                // persist_info.is_logout = false;

                // fs.writeFile("./pesist.json", JSON.stringify(persist_info, null, 2), "utf8", function writeJSON(err) {
                //     if (err) return console.log(err);
                //     console.log(JSON.stringify(persist_info));
                //     // console.log('writing to ' + fileName);
                // });

                // bfs.mkdir('/home/abesson/web/P7_Groupamania/P7_Groupomania/server/controllers/', function() {
                //     bfs.writeFile('/home/abesson/web/P7_Groupamania/P7_Groupomania/server/controllers/pesist.json', JSON.stringify(persist_info))
                // });
            }
        }
        // } else {

        //     const user = await db.User.findOne({
        //         where: { email: persist_info.mail },
        //     });

        //     const tokenObject = await token.issueJWT(user);

        //     res.status(200).send({
        //         // on renvoie le user et le token
        //         user: user,
        //         token: tokenObject.token,
        //         sub: tokenObject.sub,
        //         expires: tokenObject.expiresIn,
        //         message: "Bonjour " + user.pseudo + " !",
        //     });

        // }


    } catch (error) {
        console.error(error);

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
        // console.log("PASSE ICI");
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

        const likes = await db.Like.findAll({ where: { UserId: id } });
        const comments = await db.Comment.findAll({ where: { UserId: id } });
        const posts = await db.Post.findAll({ where: { userId: id } })

        if (user.photo !== null) {
            const filename = user.photo.split("/upload")[1];
            fs.unlink(`upload/${filename}`, () => {
                // sil' y a une photo on la supprime et on supprime le compte

                if (comments)
                    db.Comment.destroy({ where: { UserId: id } }, { truncate: true });
                if (likes)
                    db.Like.destroy({ where: { UserId: id } }, { truncate: true, restartIdentity: true });

                if (posts)
                    db.Post.destroy({ where: { userId: id } }, { truncate: true });

                db.User.destroy({ where: { id: id } });

                res.status(200).json({ messageRetour: "utilisateur supprimé" });
            });
        } else {

            if (comments)
                db.Comment.destroy({ where: { UserId: id } }, { truncate: true });
            if (likes)
                db.Like.destroy({ where: { UserId: id } }, { truncate: true, restartIdentity: true });
            if (posts)
                db.Post.destroy({ where: { userId: id } }, { truncate: true });

            // deletePost(req, res);

            db.User.destroy({ where: { id: id } }); // on supprime le compte

            res.status(200).json({ messageRetour: "utilisateur supprimé" });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};

/*

post simple
post like + com (et les enlever)
post like + com (et les enlever) pour autre utilisateur

tout ça + photo 
tout ça + gif




*/