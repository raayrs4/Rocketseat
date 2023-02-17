const { hash, compare } = require("bcryptjs")             // essa função vai gerar a criptografia da senha do usuário e comparar senhas criptografadas caso eu queira trocar de senha 
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const { response } = require("express")

class UsersController { //a classe permite que dentro dela tenha várias funções
  async create(request, response) {
    const {name, email, password} = request.body

    const database = await sqliteConnection()
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(checkUserExists) {
      throw new AppError("Este e-mail já está em uso")
    }

    const hashedPassword = await hash(password, 8)  // como paramento eu passo a senha e o nível de complexidade da criptografia

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
      [name, email, hashedPassword]
    )

    return response.status(201).json();
  }

  async update(request, response) {
    const {name, email, password, old_password} = request.body
    const {id} = request.params

    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id=(?)", [id])    // pegando todos os dados do user que tem o id x, então tenho user.name, user.password...

    if(!user) {
      throw new AppError("Usuário não encontrado")
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {  // significa que é o mesmo email mas com o id diferente, ou seja, outra pessoa já está usando aquele email 
      throw new AppError("Este e-mail já está em uso")
    }
    

    // já verifiquei os possíveis erros, agora é só salvar 
    user.name = name ?? user.name // se existir conteudo dentro de "name" então esse que vai ser utilizado, caso não vai ser utilizado o user.name que era o que já tinha antes
    user.email = email ?? user.email

    if(password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para definir a nova")
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)    // comparando a senha antiga que ele me passou recentemente com a senha que eu já tinha salva desse usuário
      
      console.log({old_password, userpass: user.password, checkOldPassword})// ??????


      if(!checkOldPassword) {
        throw new AppError("A senha antiga não confere.")  // senha antiga não confere
      }

      user.password = await hash(password, 8)   // senha antiga confere portanto estou cadastrando a nova senha 
    }

    await database.run(`
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')              
    WHERE id = ?`,
    [user.name, user.email, user.password, id]   // DATETIME('now') é uma função do banco de dados
    )
    
    return response.json()
  }

}

module.exports = UsersController


/* controller pode ter as funções:

 - index: GET para listar vários registros 
 - show: GET para exibir um registro específico 
 - create: POST para criar um registro
 - update: PUT para atualizar um registro
 - delete: DELETE para remover um registro

*/ 