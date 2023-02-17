const sqlite3 = require("sqlite3")
const sqlite = require("sqlite")
const path =  require("path")                                       // biblioteca do node que resolve a quentão dos diferentes endereços dependendo do ambiente (windows, mac...)

async function sqliteConnection() {
  const database = await sqlite.open({                             // .open para abrir uma conexão
    filename: path.resolve(__dirname, "..", "database.db"),        // filename é a propriedade que diz onde nosso arquivo vai ficar salvo, __dirname pega automaticamente o caminho de onde estou dentro do meu projeto
    driver: sqlite3.Database
  });

  return database
}

module.exports = sqliteConnection