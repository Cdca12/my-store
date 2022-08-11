const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola mundo');
});

app.get('/new-endpoint', (req, res) => {
  res.send('Hola soy un nuevo endpoint');
});

app.get('/products', (req, res) => {
  res.json({
    id: 1,
    name: 'Product 1',
    price: 1000
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
