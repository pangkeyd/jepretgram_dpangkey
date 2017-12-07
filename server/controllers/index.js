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

}

module.exports = Gallery