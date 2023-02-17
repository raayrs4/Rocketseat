// Reunindo todos os grupos de rotas que vão estar separadas por arquivos

const {Router} = require("express")

const usersRoutes = require("./users.routes")
const notesRoutes = require("./notes.routes")
const tagsRoutes = require("./tags.routes")

const routes = Router()
routes.use("/users", usersRoutes) // toda vez que o /users for acessado, ele redireciona para userRouter
routes.use("/notes", notesRoutes) // toda vez que o /notes for acessado, ele redireciona para notesRouter
routes.use("/tags", tagsRoutes) // toda vez que o /tags for acessado, ele redireciona para notesRouter

module.exports = routes 