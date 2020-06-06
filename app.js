require("./shared/global");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.port || 3000;
const app = express();
const db = mongoose.connect(__staticVar.dbUrl);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

var corsOptions = {
  origin: ["http://localhost:4200", "http://localhost:3000"],
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
//ExtractJwt = require('passport-jwt').ExtractJwt;
require("./configuration/auth/passport/passport")(app);
//========================== Route and model =======================>
const routeFactory = require("./route-factory");

routeFactory.urls.forEach((res) => {
  app.use(res.url, res.routeto);
});
//=================== End Route and model  ===========================>

app.get("/", (req, res) => {
  return res.send("Welcome in default page");
});

app.listen(port, () => {
  console.log("Welcom listener: " + port);
});
