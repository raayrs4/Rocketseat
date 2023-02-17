exports.up = knex => knex.schema.createTable("notes", table => {
  table.increments("id");
  table.text("title");
  table.text("description");
  table.integer("user_id").references("id").inTable("users")    // user_id vai ser do tipo inteiro, e vai fazer uma referência ao id que existe dentro da tabela do usuário (users), ou seja, só dá pra criar notas se existir usuário
  

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("notes")
