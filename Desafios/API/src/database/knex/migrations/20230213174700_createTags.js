exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id");
  table.text("name").notNullable();

  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");   // onDelete: se a nota for deletada, deleta as tags que estão vinculados a ela
  table.integer("user_id").references("id").inTable("users")    // user_id vai ser do tipo inteiro, e vai fazer uma referência ao id que existe dentro da tabela do usuário (users), ou seja, só dá pra criar notas se existir usuário
  
});

exports.down = knex => knex.schema.dropTable("tags")

