const mongoose = require('mongoose')
const Schema = mongoose.Schema

let user = new Schema({
  fbID: {
    type: Number,
    index: true,
    unique: true
  },
  name: String,
  email: String
})

let User = mongoose.model('User_jepretgram', user)

function getUser(cb){
  User.find({}, (err, user) => {
    if(err) res.status(500).send(err)
    cb(user)
  })
}

function signUp(body, cb){
  let userSchema = new User({
    fbID: body.fbID,
    name: body.name,
    email: body.email
  })
  userSchema.save((error, users) => {
    if(!error){
      cb(users, null)
    }else if(error.message.indexOf('fbID_1') !== -1){
      let errors = 'Fb Id already used!'
      cb(null, errors)
    }
  })
}

module.exports = {
  User,
  getUser,
  signUp
}