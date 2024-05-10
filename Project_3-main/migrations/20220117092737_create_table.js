
exports.up =  function(knex) {
    return knex.schema
        .createTable('likedislike',function(table){
        table.string('ID')
        table.string('Like')
        table.string('Dislike')
    })
  
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('likedislike')
  
};
