const express = require("express");
const logger = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const neo4j = require("neo4j-driver").v1;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//using bolt protocol driver to local host
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "pass")
);
const session = driver.session();

const indexRouter = require("./routes/index");
const characterRouter = require("./routes/pcs/characters");
const itemRouter = require("./routes/resources/items");
const valueRouter = require("./routes/values");
const gameRouter = require("./routes/games/games");
// const craftRouter = require("./routes/crafting");
// const calculatorRouter = require("./routes/calculator");

app.use("/", indexRouter);
app.use("/characters", characterRouter);
app.use("/items", itemRouter);
app.use("/values", valueRouter);
app.use("/games", gameRouter);
// app.use("/crafting", craftRouter);
// app.use("/calculator", calculatorRouter);

app.listen(5000);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error", { error: err });
// });

module.exports = app;
