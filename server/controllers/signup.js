const user = require('../models/signup')

class User {

  static getData(req, res){
    user.getUser(result => {
      res.send(result)
    })
  }

  static signUp(req, res){
    user.signUp(req.body, (result, auth) => {
      if(result){
        res.send(result)
      }else{
        res.send(auth)
      }
    })
  }

}

module.exports = User