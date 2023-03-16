const path = require("path");

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");

const fileConfig = require("./config/storage");
const routes = require("./routes/index");

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECREAT,
  })
);
app.use(cors());
app.use(fileConfig);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

//ROUTER
app.use(routes);

//ERROR HANDLER
app.use((error, req, res, next) => {
  //console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Running");
});
