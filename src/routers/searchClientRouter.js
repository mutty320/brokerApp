const express = require("express");

const debug = require("debug")("app:sessionRouter");
const { MongoClient, ObjectId } = require("mongodb");
const User = require("../../models/userModel");
const mongoose = require("mongoose");

const searchClientRouter = express.Router();

//=====================================================
//  ==> Query strings are not part of the route path.
//=====================================================
searchClientRouter.route("/").get((req, res) => {
  const mongoUrl =
    "mongodb+srv://mutty320:OC4pKMTds43unWOv@brokerapp.0zryq57.mongodb.net/brokerapp?retryWrites=true&w=majority";
  mongoose.connect(mongoUrl);
  const db = mongoose.connection;

  let client = {};

  if (req.query.f_name_search && req.query.l_name_search) {
    client = {
      f_name: req.query.f_name_search,
      l_name: req.query.l_name_search,
    };
  } else if (req.query.f_name_search) {
    client = { f_name: req.query.f_name_search };
  } else if (req.query.l_name_search) {
    client = { l_name: req.query.l_name_search };
  } else if (req.query.id_search) {
    client = { _id: req.query.id_search};  //
  }
  console.log(JSON.stringify(client, null, 2) + "hi fucker");

  db.on("error", console.error.bind(console, "Connection error:"));
  db.once("open", () => {
    console.log("Connected to the database.");
    // Your query code here
    User.find(client)
      .then((clientArr) => {
        if (clientArr.length > 0) {
          res.render("clientInfo", { clientArr });
        } else {
          res.send("Client not found");
        }
      })
      .catch((err) => {
        debug(err);
        //res.render('error_template', { error: err }); // Render an error template if something goes wrong
      });
  });

});

// authRouter
// .route("/signIn")
// .get((req, res) => {
//   res.render('signin');
// })

// app.get('/clients', (req, res) => {
//     res.render('clients', {clients})
// })
module.exports = searchClientRouter;
