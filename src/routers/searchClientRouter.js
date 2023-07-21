const express = require("express");

const debug = require("debug")("app:sessionRouter");
const { MongoClient, ObjectId } = require("mongodb");

const searchClientRouter = express.Router();

//=====================================================
//  ==> Query strings are not part of the route path.
//=====================================================
searchClientRouter.route("/").get((req, res) => {
  const mongoUrl =
    "mongodb+srv://mutty320:OC4pKMTds43unWOv@brokerapp.0zryq57.mongodb.net/?retryWrites=true&w=majority";

  const dbName = "brokerapp";

  (async function mongoConnect() {
    let connection;
    let client;
    try {
      connection = await MongoClient.connect(mongoUrl);
      debug("Connected to mongo DB");

      const db = connection.db(dbName);

      if (req.query.f_name_search && req.query.l_name_search) {
        client = await db
          .collection("clients")
          .find({
            f_name: req.query.f_name_search,
            l_name: req.query.l_name_search,
          })
          .toArray();
      }else if (req.query.f_name_search) {
        client = await db
          .collection("clients")
          .find({ f_name: req.query.f_name_search }).toArray();
        
      }else if (req.query.l_name_search) {
        client = await db
          .collection("clients")
          .find({ l_name: req.query.l_name_search }).toArray();
        
       } else {
        client = await db
          .collection("clients")
          .findOne({ id: req.query.id_search });
      }
      if (client) {
        //console.log(client);
        const clientArr = Array.isArray(client) ? client : [client];
        res.render("clientInfo", { clientArr });
      } else {
        res.send("Client not found");
      }
    } catch (error) {
      debug(error.stack);
    }
    if (connection) {
      connection.close();
    }
    // await connection.close();
  })();
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
