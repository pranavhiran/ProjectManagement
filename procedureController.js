const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const procedure = require("./procedure1.js");
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

app.get("/procedure", (req, res) => {
  procedure.find().exec((err, data) => {
    res.send(data);
  });
});

app.post("/procedure/new", (req, res) => {
  const newproc = new procedure();

  newproc.id = req.body.id;
  newproc.name = req.body.name;
  newproc.createdBy = req.body.createdBy;
  newproc.filelocation = req.body.fileloation;
  newproc.addedToProduct = req.body.addedToProduct;
  newproc.createDate = req.body.createDate;
  newproc.updateDate = req.body.updateDate;
  newproc.tags = req.body.tags;

  // res.send(newproc.name);
  newproc.save((err, data) => {
    if (err) {
      console.log(err);
      res.send({
        error: err
      });
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

app.put("/procedure/:id", (req, res) => {
  procedure.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      $set: {
        name: req.body.name,
        createdBy: req.body.createdBy,
        filelocation: req.body.filelocation,
        addedToProduct: req.body.addedToProduct,
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

app.delete("/procedure/:name", (req, res) => {
  procedure.findOneAndDelete(
    {
      name: req.params.name
    },

    //console.log(name)
    (err, data) => {
      if (err) {
        res.send("Error in Deleting");
      } else {
        console.log(data);
        res.send(243);
      }
    }
  );
});

app.listen(7020);
