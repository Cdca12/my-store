const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().alphanum().min(3).max(20);
const price = Joi.number().integer().min(10);


const getProductSchema = Joi.object({
  id: id.required(),
});

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema
}



