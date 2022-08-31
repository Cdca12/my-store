const express = require('express');

const ProductsService = require('../services/products.service');

const router = express.Router();
const service = new ProductsService();

// Endpoints
router.get('/', async (req, res, next) => {
  try {
    const { size } = req.query;
    const products = await service.findAll(size || 10);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// Todo lo que es específico debe ir antes de lo dinámico
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.findById(id);
  if (!product) {
    res.status(404).json({
      message: 'Not found'
    });
  }
  res.status(200).json(product);
});

router.post('/', async (req, res) => {
  const body = req.body;
  let productCreated = await service.create(body);

  res.status(201).json({
    message: 'Created',
    data: productCreated
  });
});

router.put('/:id', async (req, res) => {
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
  let product = await service.findById(id);
  if (!product) {
    res.status(404).json({
      message: "Error: Product doesn't exist",
      data: ''
    });
  }

  // Update product
  try {
    let productUpdated = await service.update(id, body);
    // Response code 204 doesn't let return message and data
    res.status(200).json({
      message: 'Updated',
      data: productUpdated
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  let productDeleted = await service.delete(id);
  res.status(200).json({
    message: 'Deleted',
    data: productDeleted
  });
});


module.exports = router;
