//pobieranie wszystkich potrzebnych bibliotek
const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const { port } = require('./server');
const partials = require('express-partials')

const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const bodyParser = require('body-parser')
var cors = require('cors')

const app = express();


//używanie bibliotek i plików
require('./config/passport')(passport);
require('./db/mongoose')

app.use(cors())
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(partials())

app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

//globalne zmienne
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next()
})

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())


//zmienne, w których znajdują sie ścieżki
const routes = require('./routes/index').router;
const routesUser = require('./routes/users').router;

//używanie ścieżek
app.use('/', routes)
app.use('/users/', routesUser)

//włączanie servera
app.listen(port, (req, res) =>{
    console.log(`server slucha na ${port}`)
})
