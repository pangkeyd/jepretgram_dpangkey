const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()

chai.use(chaiHttp)

function getUser(){
  describe('/GET || get all user', () => {
    it('it should be GET all user', (done) => {
      chai.request(server)
      .get('/signup')
      .end((err, res) => {
        if(err) done(err)
        res.should.have.status(200)
        done()
      })
    })
  })
}

function signUp(){
  describe('/POST || post user signup', () => {
    it('it should be POST user signup', (done) => {
      chai.request(server)
      .post('/signup')
      .send({
        'fbID': 'fbId',
        'name': 'name',
        'email': 'email'
      })
      .end((err, res) => {
        if(err) done(err)
        res.should.have.status(200)
        done()
      })
    })
  })
}

getUser()
signUp()