let connection = require('../config/mysql-db');
let moment = require('../config/moment');



class Message {

    constructor(row) {
        this.row = row;
    }

    get _id() {
        return this.row.num;
    }
    get _username() {
        return this.row.username
    }

    get _created_at() {
        return moment(this.row.created_at);
    }

    get _message() {
        return this.row.message
    }

    static create(body, callback) {
        connection.query('INSERT INTO messages SET username=?, email=?, message=?, created_at=?', [
            body.username, body.email, body.message,  new Date()], (err, result) => {
                if (err) throw err;
                callback(result);                
            })
    }

    static all(callback) {
        connection.query('SELECT * FROM messages ORDER BY created_at DESC', (err, rows) => {
            if(err) throw err;
            callback(rows.map((row) => new Message(row)));
        })
    }

    static find(id, callback) {
        connection.query('SELECT * FROM messages where num=? LIMIT 1',[id], (err, rows) => {
            if(err) throw err;
            callback(new Message(rows[0]));
        })
    }
}

module.exports = Message;