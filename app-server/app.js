const users = require("./routes/users");
const auth = require("./routes/auth");
const products = require("./routes/products");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const config = require("config");

mongoose
  .connect(config.get("mongoDB.MONGO_URI"))
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/products", products);

http.listen(config.get("server.PORT"), () =>
  console.log(`Listening on port ${config.get("server.PORT")}...`)
);
