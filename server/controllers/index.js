const gallery = require('../models/index')

class Gallery {

  static auth(req, res, next){
    if(req.headers.token){
      return next()
    }
    let login = 'Login Dulu!'
    res.send(login)
    console.log(login)
  }

  static getData(req, res){
    gallery.getGallery(result => {
      res.send(result)
    })
  }

  static postGallery(req, res){
    gallery.postGallery(req.headers, req.body, req.file, (result) => {
      res.send(result)
    })
  }

  static editCaption(req, res){
    gallery.editCaption(req.headers, req.params, req.body, (result) => {
      res.send(result)
    })
  }

  static deleteData(req, res){
    gallery.deleteGallery(req.params, (result) => {
      res.send(result)
    })
  }

}

module.exports = Gallery