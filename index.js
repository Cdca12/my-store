const express = require('express');
const faker = require('faker');

const app = express();
const port = 3000;

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

app.get('/', (req, res) => {
  res.send('Hola mundo');
});

app.get('/new-endpoint', (req, res) => {
  res.send('Hola soy un nuevo endpoint');
});

app.get('/products', (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  res.json(products.slice(0, limit));
});

// Todo lo que es específico debe ir antes de lo dinámico
app.get('/products/filter', (req, res) => {
  res.send('Yo soy un filter');
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


app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No hay query params');
  }

});

app.listen(port, () => {
  generateProducts();
  console.log(`Listening at http://localhost:${port}`);
});
