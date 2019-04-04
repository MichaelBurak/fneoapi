const express = require("express");
const logger = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const indexRouter = require("./routes/index");
// const characterRouter = require("./routes/characters");
// const itemRouter = require("./routes/items");
// const valueRouter = require("./routes/values");
// const gameRouter = require("./routes/games");
// const calculatorRouter = require("./routes/calculator");

app.use("/", indexRouter);
// app.use("/characters", characterRouter);
// app.use("/items", itemRouter);
// app.use("/values", valueRouter);
// app.use("/games", gameRouter);
// app.use("/calculator", calculatorRouter);

app.listen(5000);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { error: err });
});

module.exports = app;