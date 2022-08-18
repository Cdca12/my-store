const express = require('express');
const faker = require('faker');

const router = express.Router();

const products = [];

function generateProducts() {
  for (let i = 0; i < 100; i++) {
    products.push({
      id: i + 1,
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl()
    });

  }
}

// Inicializar lista de productos
generateProducts();

// Endpoints
router.get('/', (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  res.json(products.slice(0, limit));
});

router.post('/', (req, res) => {
  const body = req.body;
  let lastProduct = products[products.length - 1];
  products.push({
    id: lastProduct.id + 1,
    ...body
  });

  res.json({
    message: 'Created',
    data: products[products.length - 1]
  });
});

// Todo lo que es específico debe ir antes de lo dinámico
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  let product = products.find(product => product.id == id);
  res.json(product);
});

module.exports = router;
