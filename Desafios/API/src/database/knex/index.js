const config = require("../../../knexfile")
const knex = require("knex")


//criando a conexão:
const connection = knex(config.development) // conexão knex com as configurações que estão dentro do meu comnfig, com as configurações de desenvolvimento, ou seja, "development" 

module.exports = connection