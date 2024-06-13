const { body, validationResult } = require("express-validator");

const userRegisterValidationSchema = [
  body("email").isEmail().withMessage("Напиши почту!"),
  body("password")
    .isLength({ min: 3, max: 32 })
    .withMessage("пароль посложнее надо!"),
  body("firstname")
    .isLength({ min: 3, max: 32 })
    .withMessage("Напишите имя"),
];

const handlerValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

module.exports = { userRegisterValidationSchema, handlerValidationResult };
