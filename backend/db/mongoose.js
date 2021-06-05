const mongoose = require('mongoose')
const { database } = require('../server')

//łączenie z bazą danych
mongoose.connect(database,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})