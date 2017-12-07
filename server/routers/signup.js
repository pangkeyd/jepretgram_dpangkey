const express = require('express')
const router = express.Router()
const User = require('../controllers/signup')

router.get('/', User.getData)

router.post('/', User.signUp)

module.exports = router