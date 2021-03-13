const express = require("express");
const bodyParser = require("body-parser");
const api = require("./router/api");
var cors = require("cors");
const PORT = 4000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", api);

app.get("/", (req, res) => {
  res.send("Hello From Server");
});

app.listen(PORT, () => {
  console.log("Server running on localhost:" + PORT);
});
