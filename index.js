const express = require('express');
const routerApi = require('./routes');

const { logErrors, errorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

// Routing
routerApi(app);

// Middlewares
app.use(express.json());
app.use(logErrors);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hola mundo');
});

app.get('/new-endpoint', (req, res) => {
  res.send('Hola soy un nuevo endpoint');
});


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
