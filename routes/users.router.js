const express = require('express');
const faker = require('faker');

const router = express.Router();

const users = [];

function generateUsers() {
  for (let i = 0; i < 100; i++) {
    users.push({
      id: i + 1,
      name: faker.name.firstName(),
      lastName: faker.name.lastName()
    });
  }
}

generateUsers();

// Endpoints
router.get('/', (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  return res.status(200).json(users.slice(0, limit));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  let user = users.find(user => user.id == id);
  return res.status(200).json(user);
});


module.exports = router;
