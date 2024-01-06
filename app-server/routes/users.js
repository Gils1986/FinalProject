const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, validateProducts } = require("../models/user");
const { Product } = require("../models/product");
const auth = require("../middleware/auth");
const router = express.Router();

const getProducts = async (productsArray) => {
  const products = await Product.find({
    productNumber: { $in: productsArray },
  });
  return products;
};

router.get("/products", auth, async (req, res) => {
  if (!req.query.numbers) res.status(400).send("Missing numbers data");

  let data = {};
  data.products = req.query.numbers.split(",");

  const products = await getProducts(data.products);
  res.send(products);
});

router.patch("/products", auth, async (req, res) => {
  const { error } = validateProducts(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const products = await getProducts(req.body.products);
  if (products.length != req.body.products.length)
    res.status(400).send("Product numbers don't match");

  let user = await User.findById(req.user._id);
  user.products = req.body.products;
  user = await user.save();
  res.send(user);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password", "biz"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

router.post("/favoriteProducts/:productId", auth, async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: { $eq: req.params.productId },
    });
    if (!product) {
      res.status(404).send("This product doesn't exist");
      return;
    }

    const user = await User.findById(req.user._id);

    user.favoriteProductsIds = [
      ...new Set([...user.favoriteProductsIds, req.params.productId]),
    ];

    await user.save();
    res.status(201).send("ok");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/favoriteProducts/:productId", auth, async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: { $eq: req.params.productId },
    });
    if (!product) {
      res.status(404).send("This product doesn't exist");
      return;
    }

    const user = await User.findById(req.user._id);

    user.favoriteProductsIds = user.favoriteProductsIds.filter(
      (product_id) => product_id != req.params.productId
    );

    await user.save();
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/favoriteProducts", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const favoriteProducts = await Product.find({
      _id: { $in: user.favoriteProductsIds },
    });
    return res.status(200).send(favoriteProducts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
