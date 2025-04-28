import multer from 'multer';

const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(Error('Invalid file type. Only JPEG, JPG, and PNG files are allowed.'));
    }
  },
});
