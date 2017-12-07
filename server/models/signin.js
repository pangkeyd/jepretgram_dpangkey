const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('./signup')

function getUser(cb){
  User.User.find({}, (err, user) => {
    if(err) res.status(500).send(err)
    cb(user)
  })
}

function signIn(body, cb){
  User.User.find({
    fbID: body.fbID
  }, (err, user) => {
    if(user.length > 0){
      let obj = {
        id: user[0]._id,
        name: user[0].name
      }
      let token = jwt.sign(obj, process.env.SECRET_KEY)
      cb(token, null)
    }else{
      let error = 'Username atau Password Salah!'
      cb(null, error)
    }
  })
}

module.exports = {
  getUser,
  signIn
}