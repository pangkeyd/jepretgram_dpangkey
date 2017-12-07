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
      let galSchema = new Gallery({
        image: file.cloudStoragePublicUrl,
        caption: body.caption,
        author: decode.name
      })
      galSchema.save((error, gal) => {
        if(error) res.status(500).send(error)
        cb(gal)
      })
    }
  })
}

function editCaption(head, params, body, cb){
  let token = head.token
  let decoded = jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
    if(decode){
      Gallery.update({
        _id: params._id
      }, {
        $set: {
          caption: body.caption
        }
      }, (err, gal) => {
        if(err) res.status(500).send(err)
        cb(gal)
      })
    }
  })
}

function deleteGallery(params, cb){
  Gallery.remove({
    _id: params._id
  }, (err) => {
    if(err) res.status(500).send(err)
    let success = 'Success Delete!'
    cb(success)
  })
}

module.exports = {
  getGallery,
  postGallery,
  editCaption,
  deleteGallery
}