// Reunindo todos os grupos de rotas que vão estar separadas por arquivos

const {Router} = require("express")

const usersRouter = require("./users.routes")
const notesRouter = require("./notes.routes")
const tagsRouter = require("./tags.routes")
const sessionsRouter = require("./sessions.routes")

const routes = Router()
routes.use("/users", usersRouter) // toda vez que o /users for acessado, ele redireciona para userRouter
routes.use("/notes", notesRouter) // toda vez que o /notes for acessado, ele redireciona para notesRouter
routes.use("/tags", tagsRouter) // toda vez que o /tags for acessado, ele redireciona para tagsRouter
routes.use("/sessions", sessionsRouter) // toda vez que o /sessions for acessado, ele redireciona para sessionsRouter

module.exports = routes 