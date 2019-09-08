let connection = require('../config/mysql-db');
let moment = require('../config/moment');

class User {

    constructor(user) {
        this.user = user;
    }

    get _num() {
        return this.user.num;
    }

    get _username() {
        return this.user.username;
    }

    get _email() {
        return this.user.email;
    }

    get _password() {
        return this.user.password;
    }

    get _avatar() {
        return this.user.avatar;
    }

    get _id_connect() {
        return this.user.id_connect;
    }

    get _token() {
        return this.user.token;
    }

    get _connected_at() {
        return moment(this.user.connected_at);
    }

    static signin(body, callback) {
        let user = [ 'users', 'username', body._username, 'email', body._username , 'password',  body._password ];
        let cnx = { created_at: new Date(), token: '' }
        const columns = ['users.num','users.username', 'users.email', 'users.password', 'users.avatar',
         'cnx.id_connect','cnx.token','cnx.connected_at' ];

        connection.query('SELECT * FROM ?? WHERE ( (??=? OR ??=?) AND (??=?) )', ['users', user], (err, results) => {
            if (err) throw err;
            console.log(JSON.stringify(results[0]));
            // connection.query('INSERT INTO ?? SET ', ['cnx', ])
        })

    }

    static signup(body, callback) {
        let user = { created_at: new Date(), username : body._username, password: body._password, email: body._email }
        const query = connection.query('INSERT INTO users SET ?', user, (err, results) => {
            if (err) throw err;
            console.log('Row inserted : ' + (results.insertId));
            callback(results);
        });
        console.log(query);
    }

    static logout(id, callback) {
        connection.query('UPDATE ?? SET updated_at=? WHERE num=? ',['cnx', new Date(), id], function(err, results) {
            if (err) throw err;
            //  console.log('changed ' + results.changedRows + ' rows');
        });
    }
}

module.exports = User;