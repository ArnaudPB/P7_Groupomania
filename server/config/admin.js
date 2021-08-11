const db = require('../models');
const bcrypt = require('bcrypt');



/* const admin = {
pseudo: "admin",
email: "admin@mail.com",
password: "Moderator",
admin: true
} */

function setAdmin(req, res) {
    db.User.findOne({ where: { email: "admin@mail.com" } || { pseudo: "admin" } })
        .then(user => {
            if (!user) {
                bcrypt.hash("Moderator", 10)
                    .then(hash => {
                        const admin = db.User.create({
                                pseudo: "admin",
                                email: "admin@mail.com",
                                password: hash,
                                admin: true
                            })
                            .then(admin => {
                                console.log({

                                    admin,
                                    message: `Votre compte admin est bien créé ${admin.pseudo} !`,
                                });
                            })
                            .catch(error => {
                                res.status(400).json({ error });
                            })
                    })
                    .catch(error => {
                        res.status(500).send({ error });
                    })

            } else {
                console.log({ message: "l'admin est déjà créé" });
            }
        })
        .catch(error => {
            console.log({ error });
        })
}
module.exports = setAdmin();


/* db.User.create({
    pseudo: admin.pseudo,
    email: admin.email,
    password: admin.password,
    admin: admin.admin
})
    .then(() => {
    console.log({ message: 'admin enregistré dans la base de données' });
    })
    .catch(error => {
    console.log({ error });
    }) */