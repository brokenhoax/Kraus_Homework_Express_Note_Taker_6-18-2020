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
  }
};

module.exports = orm;