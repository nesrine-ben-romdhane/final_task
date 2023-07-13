module.exports = app => {
    const auth = require("../controllers/authController")
    const authuser = require("../middleware/verifyJWT")
  
    var router = require("express").Router();
    router.post("/login",auth.login);
    router.delete("/logout",authuser,auth.logout)
    router.post("/refresh",authuser,auth.refresh)
     app.use('/auth', router);
}