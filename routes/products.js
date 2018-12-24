const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/products')
const upload = require('../services/upload');

const singleUpload = upload.single('image')

/* GET users listing. */
router.get('/', ProductsController.getProducts);

router.get('/:productId', ProductsController.getProduct);

router.put('/:productId', ProductsController.updateProduct);

router.delete('/:productId', ProductsController.deleteProduct);

router.post('/', ProductsController.insertProduct);

router.post('/upload', function(req, res) {
    singleUpload(req, res, function(err, some) {
      if (err) {
        return res.status(422).send({errors: [{title: 'Error al subir la imagen', detail: err.message}] });
      }
      return res.json({'imageUrl': req.file.location});
    });
});

module.exports = router;