module.exports = app => {
    const note = require("../controllers/NoteController");
    const express = require('express')
    const authuser = require("../middleware/verifyJWT")
    const router = express.Router()
    router.use(authuser);
    router.post("/create",note.createNote);
    router.get("/allNots",note.allNotes);
    router.patch("/updateNote/:id",note.updateNote);
    router.delete("/deleteNote/:id",note.deleteNote);
    app.use('/note', router);
}