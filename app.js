const express = require("express")
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan")
const path = require("path")
//const clients = require("./src/data/clients.json")

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'mybrokersapp@gmail.com',
    pass: 'broker1!App'
  }
});


const addClientRouter = require("./src/routers/addUserRouter");
const searchClientRouter = require("./src/routers/searchClientRouter");
const sendEmailRouter =    require("./src/routers/sendEmailRouter")
                                            

const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan("tiny"));

app.use(express.static(path.join(__dirname, "/public/")))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))


app.set("views", "./src/views")
app.set("view engine", "ejs")

// app.get('/',(req, res) => {
//     res.render("index")
// })
app.get('/api',(req, res) => {
    res.json({"users": [1, 2, 3, 4]})
})
// app.post('/clientsignIn',(req, res) => {
//     res.render("clientsignIn")
// })
// app.post('/brokerSignIn',(req, res) => {
//     res.render("brokerSignIn")
// })

app.use("/addClient", addClientRouter);
app.use("/serchClient", searchClientRouter);
app.use("/sendEmail", sendEmailRouter);

// app.get('/clients', (req, res) => {
//     res.render('clients', {clients})
// })
//password for mongo-
// OC4pKMTds43unWOv

// mongodb+srv://mutty320:OC4pKMTds43unWOv@brokerapp.0zryq57.mongodb.net/?retryWrites=true&w=majority

app.listen(PORT, () => {
    debug(`listening on port ${chalk.red(PORT)}`)
})