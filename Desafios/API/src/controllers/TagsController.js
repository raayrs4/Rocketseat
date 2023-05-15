const knex = require("../database/knex")

class TagsController {
  async index(request, response){   // responsável por listar todas as tags cadastradas do usuário
    const user_id  = request.user.id

    const tags = await knex("tags")
    .where({user_id})   // filtrando pelo user_id pra mostrar as tags só desse id 
    
    return response.json(tags)
  }
}

module.exports = TagsController