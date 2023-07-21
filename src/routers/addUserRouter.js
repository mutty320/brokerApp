const express = require("express");
const mongoose = require("mongoose");

const debug = require("debug")("app:sessionRouter");
const { MongoClient, ObjectId } = require("mongodb");
const User = require("../../models/userModel");
const clientRouter = express.Router();


clientRouter.route("/").post((req, res) => {

  const user = new User(req.body);//retreavs==>({ f_name, l_name, email, number, id, country, city, date_of_birth });

  const mongoUrl =
    "mongodb+srv://mutty320:OC4pKMTds43unWOv@brokerapp.0zryq57.mongodb.net/brokerapp?retryWrites=true&w=majority";
  
  mongoose.connect(mongoUrl)
  //const db = mongoose.connection

  //const dbName = "brokerapp";
    user.save().then(user => {
    res.status(200).json(user);

  }).catch( err => {
    //debug(err.stack);
    return res.status(400).json(err)
  })

  // (async function mongoConnect() {
  //   let connection;
  //   try {
  //     connection = await MongoClient.connect(mongoUrl);
  //     debug("Connected to mongo DB");

  //     const db = connection.db(dbName);
  //     const response = await db.collection("clients").insertOne(user);
  //     res.json(user);
  //     //res.render("clients", { user });
  //   } catch (error) {
  //     debug(error.stack);
  //   }
  //   connection.close();
// })();
});

module.exports = clientRouter;
