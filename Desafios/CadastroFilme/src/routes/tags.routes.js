const {Router} = require("express")   // Router é uma funcionalidade dentro da biblioteca express

const TagsController = require("../controllers/TagsController")

const tagsController = new TagsController()

const tagsRoutes = Router()    

tagsRoutes.get("/:user_id", tagsController.index)

module.exports = tagsRoutes
