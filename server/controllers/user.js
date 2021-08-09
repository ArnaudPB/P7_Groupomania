exports.signup = (req, res, next) => {
    res.send({
        message: `Hello ${req.body.pseudo} votre compte est créé !`,
    });
};