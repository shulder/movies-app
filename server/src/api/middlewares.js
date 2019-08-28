const upload = require('multer')();

// middleware for handling multipart/form-data, used for file uploading
const handleMultipartData = () => upload.single('file');

module.exports = {
  handleMultipartData,
};
