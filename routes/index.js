const express = require("express");
const router = express.Router();
const neo4j = require("neo4j-driver").v1;

const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "pass")
);

const session = driver.session();

// /* GET home page. */
// router.get("/", function(req, res, next) {
//   res.render("index", { title: "Express" });
// });

//Home Route
router.get("/", function(req, res) {
  session.run("MATCH (n:Character) RETURN n").then(function(result) {
    var charArr = [];
    result.records.forEach(function(record) {
      charArr.push({
        id: record._fields[0].identity.low,
        name: record._fields[0].properties.name
      });
    });

    session.run("MATCH (n:Item) RETURN n").then(function(resultItems) {
      var itemArr = [];
      resultItems.records.forEach(function(record) {
        itemArr.push(record._fields[0].properties);
      });
      console.log(itemArr, charArr);
    });
  });
});

module.exports = router;
