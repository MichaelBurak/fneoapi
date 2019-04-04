const express = require("express");
const app = express();

app("/", (req, res) => {
  res.send({ hi: "there" });
});

app.listen(5000);
