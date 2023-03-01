const {Router} = require("express")          // Router é uma funcionalidade dentro da biblioteca express

const UsersController = require("../controllers/UsersController")

const usersController = new UsersController()

const usersRoutes = Router()                 // inicializando o Router

usersRoutes.post("/", usersController.create)
usersRoutes.put("/:id", usersController.update)

module.exports = usersRoutes
