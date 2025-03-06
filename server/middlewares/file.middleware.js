const multer = require("multer");
const path = require("path");

const firebaseConfig = require("../configs/firebase.config");

const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const { initializeApp } = require("firebase/app");

//init firebase
const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);

//Set Storage engine
// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },F
// });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1000000 }, //1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb); //Check file exit
  },
}).single("file");

function checkFileType(file, cb) {
  const fileType = /jpeg|jpg|png|gif|webp/;
  const extName = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileType.test(file.mimetype);

  if (mimetype && extName) {
    return cb(null, true);
  } else {
    cb("Error:Image Only ! ");
  }
}

//upload to firebase storage
async function uploadToFirebase(req, res, next) {
  if (!req.file) {
    return res.status(400).json({
      message: "Image is required",
    });
  } else {
    //save location
    const storageRef = ref(
      firebaseStorage,
      `SE-Shop/kays/${req?.file?.originalname}`
    );
    //file type
    const metadata = {
      contentType: req?.file?.mimetype,
    };
    try {
      //uploading...
      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );
      //get url from firebase
      req.file.firebaseUrl = await getDownloadURL(snapshot.ref);
      next();
    } catch (error) {
      res.status(500).json({
        message:
          error.message || "Something went wrong while uploading to firebase",
      });
    }
  }
}

module.exports = { upload, uploadToFirebase };
