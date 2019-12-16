const Product = require("../models/Product");

const controller = {
  createProduct: async (req, res) => {
    res.send("product created!!");
  }
};

module.exports = controller;
