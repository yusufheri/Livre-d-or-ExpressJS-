let connection = require('../config/mysql-db');


class Message {

    static create(body, callback) {
        connection.query('INSERT INTO messages SET username=?, email=?, message=?, created_at=?', [
            body.username, body.email, body.message,  new Date()], (err, result) => {
                if (err) throw err;
                callback(result);                
            })
    }

    static all(callback) {
        connection.query('SELECT * FROM messages ORDER BY created_at DESC', (err, row) => {
            if(err) throw err;
            callback(row);
        })
    }
}

module.exports = Message;