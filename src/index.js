const path = require("path");

const express = require("express");
const cors = require("cors");

const fileConfig = require("./config/storage");
const routes = require("./routes/index");

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileConfig);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(routes);

app.use((error, req, res, next) => {
  //console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(3000, () => {
  console.log("Server Running");
});
