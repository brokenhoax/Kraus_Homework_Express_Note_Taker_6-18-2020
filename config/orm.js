const connection = require('./connection');

const orm = {

  selectAll: function(cb) {
    connection.query('SELECT * FROM my_notes', function (err, data){
      if (err) cb(err, null);
      cb(null, data);
    });
  },
  
  insertOne: function(note_title, cb) {
    const sqlQuery = `INSERT INTO my_notes(note_title) VALUES('${note_title}')`;
    connection.query(sqlQuery, function (err, data) {
      if (err) cb(err, null);
      cb(null, data);
    });
  }, 

  deleteOne: function(note_id, cb) {
    const sqlQuery = `DELETE FROM my_notes WHERE note_id = ${note_id}`;
    connection.query(sqlQuery, function (err, data) {
      if (err) cb(err, null); 
      cb(null, data);
    });
  },

  updateOne: function(note_id, cb) {
    const sqlQuery = `UPDATE FROM my_notes WHERE note_id = ${note_id}`;
    connection.query(sqlQuery, function (err, data) {
      if (err) cb(err, null); 
      cb(null, data);
    });
  }



};

module.exports = orm;