const multer = require("multer");

let filename = "";
const myStorage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    let date = Date.now();
    filename = date + "." + file.mimetype.split("/")[1];
    cb(null, filename);
  },
});

const upload = multer({ storage: myStorage });

module.exports = upload;
