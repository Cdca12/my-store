const express = require('express');

const ProductsService = require('../services/products.service');

const router = express.Router();
const service = new ProductsService();

// Endpoints
router.get('/', (req, res) => {
  const { size } = req.query;
  const products = service.findAll(size || 10);
  res.status(200).json(products);
});

// Todo lo que es específico debe ir antes de lo dinámico
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findById(id);
  if (!product) {
    res.status(404).json({
      message: 'Not found'
    });
  }
  res.status(200).json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  let productCreated = service.create(body);

  res.status(201).json({
    message: 'Created',
    data: productCreated
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  // Different id
  if (body.id != id) {
    res.status(400).json({
      message: 'Error: Provided id is different than param',
      data: ''
    });
  }

  // Id doesn't exist
  let product = service.findById(id);
  if (!product) {
    res.status(404).json({
      message: "Error: Product doesn't exist",
      data: ''
    });
  }

  // Update product
  let productUpdated = service.update(id, body);
  // Response code 204 doesn't let return message and data
  res.status(200).json({
    message: 'Updated',
    data: productUpdated
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let productDeleted = service.delete(id);
  res.status(200).json({
    message: 'Deleted',
    data: productDeleted
  });
});


module.exports = router;
