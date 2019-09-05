let connection = require('../config/mysql-db');


export class Message {
    create(username, email, msg) {
        connection.query('INSERT INTO messages SET username=?, email=?, message=?, created_at=?', [
            username, email, msg,  new Date()
        ])
    }
}