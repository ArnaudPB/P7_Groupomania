const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');

exports.signup = (req, res, next) => {
    const passwordSchema = new passwordValidator();

    passwordSchema
        .is()
        .min(8) // Minimum length 8
        .is()
        .max(50) // Maximum length 50
        .has()
        .uppercase() // Must have uppercase letters
        .has()
        .lowercase() // Must have lowercase letters
        .has()
        .not()
        .symbols(); // Has no symbols
    //.has().not().spaces()
    // Should not have spaces is a wrong rule to apply
    if (!emailValidator.validate(req.body.email) ||
        !passwordSchema.validate(req.body.password)
    ) {
        return res.status(400).send({
            error: 'Check your email address format and your password should be at least 8 characters long, contain uppercase, lowercase letter  ',
        });
    } else if (
        emailValidator.validate(req.body.email) ||
        passwordSchema.validate(req.body.password)
    ) {
        next();
    }
};