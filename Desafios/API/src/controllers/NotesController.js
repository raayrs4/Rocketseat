const { request } = require("express");
const knex = require("../database/knex")

class NotesController{
  async create(request, response) {
    const {title, description, tags, links} = request.body
    const {user_id} = request.params
        
    const note_id = await knex("notes").insert({    
      title, 
      description,
      user_id
    });                 // recuperando o código da nota que foi inserida assim que eu criei, armazenando o id
  
    const linksInsert = links.map(link => {
      return {
        note_id,       // recebendo o código da nota que esse link tá vinculado
        url: link      // mudando de link para url
      }
    });

    await knex("links").insert(linksInsert); ///????  //inserindo os links
    
    const tagsInsert = tags.map(name => {
      return {
        note_id,       // recebendo o código da nota que essa tag tá vinculada
        name,    
        user_id
      }
    });
    
    await knex("tags").insert(tagsInsert);

    response.json();     // ???
  }

  async show(request, response) {
    const {id} = request.params

    const note = await knex("notes").where({id}).first()     // selecionar só a primeira nota buscando pelo id dela
    // pq await aqui ?? e pq tem que usar knex ??
    const tags = await knex("tags").where({note_id: id}).orderBy("name")
    const links = await knex("links").where({note_id: id}).orderBy("created_at")

    return response.json({
      ...note,   // colocando todos os detalhes da nota
      tags,
      links
    })
  }

  async delete(request, response) {
    const {id} = request.params

    await knex("notes").where({id}).delete()

    return response.json()
  }

  async index(request, response) {    // método responsável por listar as notes
    const {title, user_id, tags} = request.query

    let notes

    if(tags) {                       // caso a tag exista, vai passar por um filtro
      const filterTags = tags.split(',').map(tag => tag.trim())      // convertendo a tag de um texto simples para um vetor 

      notes = await knex("tags")
      .select([                          // passo um array com quais campos eu quero selecionar de ambas as tabelas
        "notes.id",
        "notes.title",
        "notes.user_id"
      ])
      .where("notes.user_id", user_id)           // filtrando baseado no id do usuário
      .whereLike("notes.title", `%${title}%`)
      .whereIn("name", filterTags)               // pesquisando baseado nos nomes das tags e comparando se a tag de fato existe
      .innerJoin("notes", "notes.id", "tags.note_id")     // innerJoin para conectar uma tabela com a outra, primeiro passa o nome da tabela e depois quais campos quero usar para conectar elas  
      .orderBy("notes.title")                    // organizando por ordem alfabética o titulo

    } else {                         // caso a tag não exista vai acontecer uma consulta normal
      notes = await knex("notes")
      .where({user_id})                  // mostrar somente as notas do usuário em questão
      .whereLike("title", `%${title}%`)  // whereLike busca por valores aproximados que existam dentro de uma palavra/conteúdo
      .orderBy("title")
    }

    const userTags = await knex("tags").where({user_id}) // pegando as tags daquele usuário
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)   // noteTag filtra as tags da nota

      return {
        ...note,
        tags: noteTags
      }
    })

    return response.json(notesWithTags)
  }
}

module.exports = NotesController