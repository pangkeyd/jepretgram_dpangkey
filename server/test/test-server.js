const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMjhlMjdhYzg3ODJiNTFiMDViMDUxNyIsIm5hbWUiOiJuYW1lIiwiaWF0IjoxNTEyNjI5NjY1fQ.hOcDycpEeRDjbnUV2M6UetbMBUU9nA_08YrI20sSLFs'

chai.use(chaiHttp)

// SIGNUP

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
        'fbID': 10,
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

// SIGNIN

function getUserSignIn(){
  describe('/GET || get user', () => {
    it('it should be GET user', (done) => {
      chai.request(server)
      .get('/signin')
      .end((err, res) => {
        if(err) done(err)
        res.should.have.status(200)
        done()
      })
    })
  })
}

function signIn(){
  describe('/POST || post user signin', () => {
    it('it should be POST user signin', (done) => {
      chai.request(server)
      .post('/signin')
      .send({
        'fbID': 10
      })
      .end((err, res) => {
        if(err) done(err)
        res.should.have.status(200)
        done()
      })
    })
  })
}

// GALLERY

function getGallery(){
  describe('/GET || get gallery', () => {
    it('it should be GET get gallery', (done) => {
      chai.request(server)
      .get('/')
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
getUserSignIn()
signIn()
getGallery()
