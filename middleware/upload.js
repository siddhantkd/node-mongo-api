const path = require("path");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, ext + "-" + Date.now());
  },
});

var upload = multer({
  storage: storage,
});
