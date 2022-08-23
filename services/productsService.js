const faker = require('faker');

class ProductsService {

  constructor() {
    this.products = [];
    this.generateProducts();
  }

  // Inicializar lista de productos
  generateProducts() {
    for (let i = 0; i < 100; i++) {
      this.products.push({
        id: i + 1,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
      });

    }
  }

  findAll(size) {
    return this.products.slice(0, size);
  }

  findById(id) {
    return this.products.find(product => product.id == id);
  }

  create(product) {
    let lastProduct = this.products[this.products.length - 1];
    let newId = lastProduct.id + 1;
    this.products.push({
      id: newId,
      ...product
    });
    return this.products.find(product => product.id == newId);
  }

  update(id, product) {
    let index = this.products.findIndex(product => product.id == id);
    this.products[index] = product;
    return product;
  }

  delete(id) {
    let index = this.products.findIndex(product => product.id == id);
    return this.products.splice(index, 1);
  }


}

module.exports = ProductsService;
