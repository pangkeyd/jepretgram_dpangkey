const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

let gallery = new Schema({
  image: String,
  caption: String,
  author: String,
  like: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User_jepretgram'
    }
  ],
  dislike: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User_jepretgram'
    }
  ]
})

let Gallery = mongoose.model('Gallery_jepretgram', gallery)

function getGallery(cb){
  Gallery.find({}, (err, gal) => {
    if(err) res.status(500).send(err)
    cb(gal)
  })
}

function postGallery(head, body, file, cb){
  let token = head.token
  let decoded = jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if(decode){
      // let galSchema = new Gallery({
      //   image: 
      // })
    }
  })
}

module.exports = {
  getGallery,
  postGallery
}