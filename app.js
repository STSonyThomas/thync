const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const e = require("express");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT||3000, () => {
  console.log("Server is running on port 3000");
});
