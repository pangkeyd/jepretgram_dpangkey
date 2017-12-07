const express = require('express')
const router = express.Router()
const Gallery = require('../controllers/index')
const image = require('../lib/image')

router.get('/', image.setStorage)

module.exports = router