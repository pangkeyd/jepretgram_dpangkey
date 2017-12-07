const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const URI = process.env.DB_NAME

mongoose.connect(URI, {
  useMongoClient: true
})

mongoose.Promise = global.Promise

var db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDb Connection Error!'))

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ROUTES

const signup = require('./routers/signup')
const signin = require('./routers/signin')
const gallery = require('./routers/index')

app.use('/signup', signup)
app.use('/signin', signin)
app.use('/', gallery)

app.listen(process.env.PORT_DEF , () => {
  console.log('AYO JALAN!')
})

module.exports = app