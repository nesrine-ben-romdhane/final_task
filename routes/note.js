module.exports = app => {
    const note = require("../controllers/NoteController");
    const authuser = require("../middleware/verifyJWT")
    router.use(authuser)
  
    var router = require("express").Router();
    router.post("/create",note.createNote);
    router.get("/allNots",note.allNotes);
    router.patch("/updateNote/:id",note.updateNote);
    router.delete("/deleteNote/:id",note.deleteNote);
     app.use('/note', router);
}