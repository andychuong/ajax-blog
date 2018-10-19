
exports.up = function(knex, Promise) {
  return knex.schema.createTable('blogpost', table => {
    table.increments()
    table.string('title').defaultTo('No Title')
    table.text('content').defaultTo('')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('blogpost')
};
