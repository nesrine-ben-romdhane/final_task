module.exports = app =>{
    const userController = require("../controllers/UserControllers")
    var router = require("express").Router()
    router.post("/createUser",userController.createNewuser)
    router.get("/alluser",userController.getalluser)
    router.patch("/updateUser/:id",userController.updateUser)
    router.delete("/deleteUser/:id",userController.deleteUser)
app.use("/user",router)
}