const Storage = require('@google-cloud/storage')

const storage = new Storage({
  projectId: 'linear-time-184203',
  keyFilename: 'keyfile.json'
})

const bucket = 'jepretgram_lc'

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

module.exports = {
  bucket,
  setStorage
}

// function sendUploadToGCS (req, res, next) {
//   if (!req.file) {
//     return next();
//   }

//   const gcsname = Date.now() + req.file.originalname;
//   const file = bucket.file(gcsname);

//   const stream = file.createWriteStream({
//     metadata: {
//       contentType: req.file.mimetype
//     }
//   });

//   stream.on('error', (err) => {
//     req.file.cloudStorageError = err;
//     next(err);
//   });

//   stream.on('finish', () => {
//     req.file.cloudStorageObject = gcsname;
//     file.makePublic().then(() => {
//       req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
//       next();
//     });
//   });

//   stream.end(req.file.buffer);
// }