const sqliteConnection = require('../../sqlite')
const createUsers = require('./createUsers')

async function migrationsRun() {   // função para executar as migrations, que vão recriar as tabelas caso preciso
  const schemas = [                // objeto chamado schemas, que se refere as tabelas que meu banco de dados vai ter 
    createUsers,
  ].join('')                       // joins serve para passar o parametro que vai juntar todas as migrations 

  sqliteConnection()
  .then(db => db.exec(schemas))
  .catch(error => console.error(error))
}

module.exports = migrationsRun