const Joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  productDescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  productPrice: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 99999,
  },
  productImage: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024,
  },
  productNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 99999999999,
    unique: true,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    productName: Joi.string().min(2).max(255).required(),
    productDescription: Joi.string().min(2).max(1024).required(),
    productPrice: Joi.number().min(1).max(99999).required(),
    productImage: Joi.string().min(11).max(1024),
  });

  return schema.validate(product);
}

async function generateProductNumber(Product) {
  while (true) {
    let randomNumber = _.random(1000, 999999);
    let product = await Product.findOne({ productNumber: randomNumber });
    if (!product) return String(randomNumber);
  }
}

exports.Product = Product;
exports.validateProduct = validateProduct;
exports.generateProductNumber = generateProductNumber;
