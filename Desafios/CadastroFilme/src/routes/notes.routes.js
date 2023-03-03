const {Router} = require("express")   // Router é uma funcionalidade dentro da biblioteca express

const NotesController = require("../controllers/NotesController")

const notesController = new NotesController()

const notesRoutes = Router()    

notesRoutes.post("/:user_id", notesController.create)
notesRoutes.get("/:id", notesController.show)
notesRoutes.delete("/:id", notesController.delete)
notesRoutes.get("/", notesController.index)

module.exports = notesRoutes
