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
    //  response.send(request.params.id)    
    let Message = require('./models/message');
    Message.find(request.params.id, function(message) {
        response.render('messages/show', {message: message});
    })
})

app.listen(8080)