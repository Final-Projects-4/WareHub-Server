const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './assets');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({storage: storage})


router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.post('/create', (req, res, next) => {
    const upload = multer({ storage }).single('image');
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      ProductController.create(req, res, next);
    });
  });
router.post('/stocks', ProductController.addStock);
router.put('/:id', upload.single('image'), ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router;
