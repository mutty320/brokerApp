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

    user.save().then(user => {
    res.status(200).json(user);

  }).catch( err => {
    //debug(err.stack);
    return res.status(400).json(err)
  })

});

module.exports = clientRouter;
