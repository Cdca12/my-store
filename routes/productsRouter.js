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

// Todo lo que es específico debe ir antes de lo dinámico
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  let product = products.find(product => product.id == id);
  res.json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  let lastProduct = products[products.length - 1];
  let newId = lastProduct.id + 1;
  products.push({
    id: newId,
    ...body
  });
  let productCreated = products.find(product => product.id == newId);

  res.json({
    message: 'Created',
    data: productCreated
  });
});

router.put('/:id', (req, res) => {
  const body = req.body;
  const { id } = req.params;

  // Different id
  if (body.id != id) {
    res.json({
      message: 'Error: Provided id is different than param',
      data: ''
    });
    return;
  }

  // Id doesn't exist
  let index = products.findIndex(product => product.id == id);
  if (index < 0) {
    res.json({
      message: "Error: Product doesn't exist",
      data: ''
    });
    return;
  }

  // Update product
  let productUpdated = products[index] = body;
  res.json({
    message: 'Updated',
    data: productUpdated
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let index = products.findIndex(product => product.id == id);
  let productDeleted = products.splice(index, 1);
  res.json({
    message: 'Deleted',
    data: productDeleted
  });
});


module.exports = router;
