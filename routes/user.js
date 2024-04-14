const Router = require("express").Router;
const router = new Router();
const userController = require("../controllers/user-controller");
const {body} = require('express-validator')

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  // потом добавить валидацию на остальные поля юзера
  userController.registration
);

router.post("/login", userController.login)
router.post("/logout", userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)

module.exports = router;
