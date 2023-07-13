module.exports = app => {
    const note = require("../controllers/NoteController");
    const authuser = require("../middleware/verifyJWT")
  
    var router = require("express").Router();
    router.post("/create",authuser,note.createNote);
    router.get("/allNots",authuser,note.allNotes)
    router.get("/notes/:id",authuser,note.getnote_by_id)
    router.patch("/updateNote/:id",authuser,note.updateNote)
    router.delete("/deleteNote/:id",authuser,note.deleteNote)
     app.use('/note', router);
}