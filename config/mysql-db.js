let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'livredor'
});
 
connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack)
    }
    console.log('Connected as id :' + connection.threadId);
});

module.exports = connection;