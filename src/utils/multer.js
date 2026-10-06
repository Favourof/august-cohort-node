import multer from "multer";
import crypto from "node:crypto";
import path from "node:path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },

  filename: function (req, file, cb) {
    crypto.randomBytes(5, function (err, raw) {
      if (err) return cb(err);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + raw.toString("hex") + ext);
    });
  },
});

export const upload = multer({ storage });
