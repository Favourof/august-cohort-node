import multer, { memoryStorage } from "multer";
import crypto from "node:crypto";
import path from "node:path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },

//   filename: function (req, file, cb) {
//     crypto.randomBytes(5, function (err, raw) {
//       if (err) return cb(err);
//       const ext = path.extname(file.originalname);
//       cb(null, file.fieldname + "-" + raw.toString("hex") + ext);
//     });
//   },
// });

const storage = memoryStorage();

function fileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|gif/;

  // 2. Check the file extension
  const isValidExt = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  console.log(isValidExt, "Extention");

  // 3. Check the MIME type
  const isValidMimeType = allowedTypes.test(file.mimetype);

  console.log(isValidExt, "mime type");

  if (isValidExt || isValidMimeType) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only PNG, JPG, JPEG, and GIF images are allowed!",
      ),
    );
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fieldSize: 5 * 1024 * 1024 },
});
