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

  user = new User(
    _.pick(req.body, ["name", "email", "password", "biz", "cards"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

router.post("/favoriteProducts/:productId", auth, async (req, res) => {
  // const { error } = validateCard(req.body);
  // if (error) {
  //   res.status(400).send(error.details[0].message);
  //   return;
  // }
  // const cards = await Card.find({ bizNumber: { $eq: req.params.cardId } });
  // if (cards.length != req.body.cards.length) {
  //   res.status(400).send("At least some of the numbers were not found");
  //   return;
  // }
  // const user = await User.findById(req.user._id);
  // user.card = [...new Set([...user.cards, ...req.body.cards])];
  // await user.save();
  // req.json(user);
  //const user = await User.findOne({
  //  _id: req.user._id,
  //});
  // if (card)
  // {
  //     return res.status(200).send("Card already in favorite cards.");
  // }
  // post = await card.save();
  // res.send(post);

  try {
    // console.log("In /users/favoriteCards/" + req.params.cardId);

    // console.log(
    //   "In /users/favoriteCards/" + req.params.cardId + ": ",
    //   "req.user._id=",
    //   req.user._id
    // );

    // const updatedUser = await User.findOneAndUpdate(
    //   // Search for the user in mongoose by user.id injected to the request
    //   // by the middleware (from the jwt token)
    //   { _id: req.user._id },
    //   // Add the new favorite card id to the user's favoriteCards array
    //   { $push: { favoriteCards: req.params.cardId } },
    //   // Return the updated document (into updatedUser)
    //   { new: true }
    // );
    // if (updatedUser) {
    //   res.status(500).send("Failed to add card to favorite cards.");
    // }

    // console.log("finding the card");

    const product = await Product.findOne({
      _id: { $eq: req.params.productId },
    });
    if (!product) {
      res.status(404).send("This product doesn't exist");
      return;
    }

    console.log("finding user");

    const user = await User.findById(req.user._id);

    user.favoriteProductsIds = [
      ...new Set([...user.favoriteProductsIds, req.params.productId]),
    ];

    console.log("saving user");

    await user.save();
    //req.json(user);
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

    // console.log("finding user");

    const user = await User.findById(req.user._id);

    // user.favoriteCardsIds = [
    //   ...new Set([...user.favoriteCardsIds, req.params.cardId]),
    // ];
    user.favoriteProductsIds = user.favoriteProductsIds.filter(
      (product_id) => product_id != req.params.productId
    );

    await user.save();
    //req.json(user);
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/favoriteProducts", auth, async (req, res) => {
  try {
    console.log("aaa");
    console.log("In favorites. req.user=", req.user);

    const user = await User.findById(req.user._id);

    console.log("In favorites. user=", user);

    const favoriteProducts = await Product.find({
      _id: { $in: user.favoriteProductsIds },
    });
    return res.send(favoriteProducts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
  return res.status(200);
});

module.exports = router;
