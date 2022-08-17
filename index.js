const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola mundo');
});

app.get('/new-endpoint', (req, res) => {
  res.send('Hola soy un nuevo endpoint');
});

const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 1000,
    category: {
      id: 1,
      name: 'Category 1'
    }
  },
  {
    id: 2,
    name: 'Product 2',
    price: 2000,
    category: {
      id: 2,
      name: 'Category 2'
    }
  },
  {
    id: 3,
    name: 'Product 3',
    price: 3000,
    category: {
      id: 1,
      name: 'Category 1'
    }
  }
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  let product = products.find(product => product.id.toString() === id);
  res.json(product);
});

app.get('/categories/:categoryId/products/:price', (req, res) => {
  const { categoryId, price } = req.params;
  res.json(products.filter(product => product.category.id == categoryId && product.price >= price));
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
