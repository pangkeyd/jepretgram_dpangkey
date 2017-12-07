const Storage = require('@google-cloud/storage')

const storage = new Storage({
  projectId: 'linear-time-184203',
  keyFilename: 'keyfile.json'
})

const bucket = 'jepretgram_lc'

const CLOUD_BUCKET = 'jepretgram_lc'

function setStorage(){
  storage
  .createBucket(bucket)
  .then(() => {
    console.log(`Bucket ${bucket} created!`)
  })
  .catch(err => {
    console.error('Error:', err)
  })
}

function sendUploadToGCS (req, res, next) {
  if (!req.file) {
    return next();
  }

  const gcsname = Date.now() + req.file.originalname;
  const file = storage.bucket(bucket).file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });
  });

  stream.end(req.file.buffer);
}

const Multer = require('multer');
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});

function getPublicUrl (filename) {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

module.exports = {
  bucket,
  setStorage,
  multer,
  sendUploadToGCS
}