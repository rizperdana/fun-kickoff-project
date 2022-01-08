const { check, validationResult } = require("express-validator");

exports.validateRegister = [
    check("username", "Please enter a username").not().isEmpty(),
    check("email", "Please enter a valid email address").isEmail(),
    check(
        "password",
        "Please enter a password with 6 or more characters"
    ).isLength({
        min: 6
    }),
    (req, res, next) => {
        const errors = validationResult(req);

        console.log(errors);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
];

exports.validateLogin = [
    check("email", "Please enter a valid email address").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
];

exports.validateProfile = [
    check('firstName', 'First name should be 3 characters or more and letter only')
    .not()
    .isEmpty({ min: 3 })
    .isAlpha(),
    check('lastName', 'Last name should be 3 characters or more and letter only')
    .not()
    .isEmpty({ min: 3 })
    .isAlpha(),
    check('availability', 'Enter valid array of strings').isArray(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
]