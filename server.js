let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session')

let app = new express();

// Template
app.set('view engine', 'ejs');


// Middleware
app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));
app.use(require('./middlewares/flash'));

// Routes
/**
 * return all comments from Database MySQL
 */
app.get('/', (request, response) => {
    let Message = require('./models/message');
    Message.all(function(messages) {
        response.render('pages/index', {messages: messages});
    })
    
})


app.post('/', (request, response) => {
    if (request.body.message === undefined ||request.body.message === '') {
        request.flash('error', 'Prière de complèter le champ vide');      
        response.redirect('/');  
    } else {
        let Message = require('./models/message');

        Message.create(request.body, function() {
            request.flash('success', 'Bien enregistré avec succès');
            response.redirect('/');
        })
    }
    
})

app.get('/message/:id', (request, response) => {
    let Message = require('./models/message');
    Message.find(request.params.id, function(message) {
        response.render('messages/show', {message: message});
    })
})

app.put('/message/:id', (request, response) => {
    let Message = require('./models/message');
    Message.update(request.params.id, function() {
        request.flash('success', 'Modification avec succès');  
        response.redirect(`/message/${request.params.id}`)
    })
});

app.delete('/message/:id', (request, response) => {
    let Message = require('./models/message');
    Message.delete(request.params.id, function() {
        console.log('Suppression avec succès');
        response.send('Suppression avec succès');
    })
    
});

app.post('/api/signup', (req, res) => {
    if (req.body.user === undefined || req.body.user === '') {
        request.flash('error', 'Prière de complèter les champs vides');  
        response.redirect('/');  
    } else {
        let User = require('./models/user');
        User.signup(req.body, function() {
            request.flash('success', 'Bien enregistré avec succès');
            response.redirect('/');
        })
    }
})

app.post('/api/signin', (req, res) => {
    if (req.body.user === undefined || req.body.user === '') {
        request.flash('error', 'Prière de complèter le champ vide');  
        response.redirect('/');  
    } else {
        let User = require('./models/user');
        User.signup(req.body, function() {
            request.flash('success', 'Connecté avec succès');
            response.redirect('/');
        });
    }
})

app.post('/api/logout', (req, res) => {
    let User = require('./models/user');
        User.logout(req.body, function() {
            request.flash('success', 'Déconnecté avec succès');
            response.redirect('/');
        })
})
app.listen(8080)