const express = require('express');
const faker = require('faker');

const router = express.Router();

const categories = [];

function generateCategories() {
  for (let i = 0; i < 100; i++) {
    categories.push({
      id: i + 1,
      name: faker.commerce.productAdjective(),
      product: {
        id: Math.floor(Math.random() * 100)
      }
    });
  }
}

// Inicializar lista de categories
generateCategories();

// Endpoints
router.get('/', (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  res.status(200).json(categories.slice(0, limit));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  let category = categories.find(category => category.id == id);
  res.status(200).json(category);
});

router.get('/products/:productId', (req, res) => {
  const { productId } = req.params;
  let categoriesList = categories.filter(category => category.product.id == productId);
  res.status(200).json(categoriesList);
});


module.exports = router;
