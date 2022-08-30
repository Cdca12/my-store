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

  async findAll(size) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products.slice(0, size));
      }, 3000);
    })
  }

  async findById(id) {
    return this.products.find(product => product.id == id);
  }

  async create(product) {
    let lastProduct = this.products[this.products.length - 1];
    let newId = lastProduct.id + 1;
    let newProduct = {
      id: newId,
      ...product
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id, product) {
    let index = this.products.findIndex(product => product.id == id);
    if (index < 0) {
      throw new Error('Product not found');
    }
    this.products[index] = product;
    return product;
  }

  async delete(id) {
    let index = this.products.findIndex(product => product.id == id);
    if (index < 0) {
      throw new Error('Product not found');
    }
    return this.products.splice(index, 1);
  }


}

module.exports = ProductsService;
