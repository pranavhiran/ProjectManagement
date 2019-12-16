const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const product = require("../models/Product.js");
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

mongoose.connect(
  "mongodb://localhost:27017/incubator",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (!err) {
      console.log("MongoDB Connection Succeeded !!!!!");
    } else {
      console.log("Error in DB Connection  :" + err);
    }
  }
);

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to Procedures"
  });
});

app.get("/product", (req, res) => {
  product.find({}).exec((err, data) => {
    res.send(data);
  });
});

app.post("/product/new", (req, res) => {
  const newprod = new product();

  //newprod.id = req.body.id;
  newprod.name = req.body.name;
  newprod.createdBy = req.body.createdBy;
  newprod.file = req.body.file;
  newprod.logo = req.body.logo;
  newprod.createDate = req.body.createDate;
  newprod.updateDate = req.body.updateDate;
  newprod.tags = req.body.tags;
  newprod.tasks = req.body.tasks;

  newprod.save((err, data) => {
    if (err) {
      console.log(err);
      res.send({ error: err });
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

app.put("/product/:id", (req, res) => {
  product.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      $set: {
        name: req.body.name,
        createdBy: req.body.createdBy,
        filelocation: req.body.filelocation,
        //addedToProduct: req.body.addedToProduct,
        createDate: req.body.createDate,
        updateDate: req.body.updateDate
      }
    },
    { upsert: true },
    (err, data) => {
      if (err) {
        console.log(err);
        console.log("Error Occured");
      } else {
        console.log(data);
        res.send(data);
      }
    }
  );
});
app.listen(6040);
