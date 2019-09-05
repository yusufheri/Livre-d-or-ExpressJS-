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
    console.log(request.session)    
    response.render('pages/index');
})

app.post('/', (request, response) => {
    if (request.body.message === undefined ||request.body.message === '') {
        request.flash('error', 'Prière de complèter le champ vide');
        response.redirect('/')
    }
})

app.listen(80)