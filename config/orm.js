const connection = require('./connection');

const orm = {
  selectAll: function(cb) {
    connection.query('SELECT * FROM my_notes', function (err, data){
      if (err) cb(err, null);
      cb(null, data);
    });
  }
};

module.exports = orm;