const express = require('express')
const router = express.Router()
const Gallery = require('../controllers/index')
const image = require('../lib/image')

router.get('/', Gallery.getData)

router.post('/', Gallery.auth, image.multer.single('image'), image.sendUploadToGCS,
Gallery.postGallery,
(req, res, next) => {
  if (req.file && req.file.cloudStoragePublicUrl) {
    data.imageUrl = req.file.cloudStoragePublicUrl;
  }
})

router.put('/:_id', Gallery.auth, Gallery.editCaption)

router.delete('/:_id', Gallery.auth, Gallery.deleteData)

module.exports = router