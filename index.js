const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

// Middlewares
app.use(express.json());

routerApi(app);

app.get('/', (req, res) => {
  res.send('Hola mundo');
});

app.get('/new-endpoint', (req, res) => {
  res.send('Hola soy un nuevo endpoint');
});


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
