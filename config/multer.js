const multer = require("multer");

const myStorage = (destination) =>
  multer.diskStorage({
    destination: `./uploads/${destination}`,
    filename: (req, file, cb) => {
      let date = Date.now();
      let filename = date + "." + file.mimetype.split("/")[1];
      cb(null, filename);
    },
  });

const upload = (destination) => multer({ storage: myStorage(destination) });

module.exports = upload;
