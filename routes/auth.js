const Router = require("express").Router;
const router = new Router();
const authController = require("../controllers/auth-controller");
const ValidationSchema = require('../validators/Auth')
const {handlerValidationResult} = require('../validators/Auth')

router.post(
  "/register",
  ValidationSchema.userRegisterValidationSchema,
  handlerValidationResult,
  authController.registration
);

router.post("/login", authController.login)
router.post("/logout", authController.logout)
router.post('/refresh', authController.refresh)
router.get('/activate/:link', authController.activate)

module.exports = router;
