const express = require("express");
const _ = require("lodash");
const {
  Product,
  validateProduct,
  generateProductNumber,
} = require("../models/product");
const auth = require("../middleware/auth");
const { User } = require("../models/user");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  if (!req.user) {
    res.status(401).send("Access Denied");
    return;
  }

  let products = await Product.find();
  const user = await User.findById(req.user._id);
  products = products.map((product) => {
    return {
      ...product._doc,
      isFavorite: user.favoriteProductsIds.includes(product._id),
    };
  });

  res.send(products);
});

router.get("/guest", async (req, res) => {
  let products = await Product.find();

  res.send(products);
});

router.delete("/:id", auth, async (req, res) => {
  const product = await Product.findOneAndRemove({
    _id: req.params.id,
  });
  if (!product)
    return res
      .status(404)
      .send("The product with the given ID was not found.");
  return res.send(product);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
    }
  );

  if (!product)
    return res
      .status(404)
      .send("The product with the given ID was not found.");

  return res.send(product);
});

router.get("/:id", auth, async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
  });
  if (!product)
    return res
      .status(404)
      .send("The product with the given ID was not found.");
  return res.send(product);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = new Product({
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice,
    productQuantity: req.body.productQuantity,
    productImage: req.body.productImage
      ? req.body.productImage
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    productNumber: await generateProductNumber(Product),
    user_id: req.user._id,
  });

  post = await product.save();
  res.send(post);
});

module.exports = router;
