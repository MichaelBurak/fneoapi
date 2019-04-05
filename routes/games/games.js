const express = require("express");
const router = express.Router();
const neo4j = require("neo4j-driver").v1;

const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "pass")
);

const session = driver.session();

//Games All Read Route
router.get("/", function(req, res) {
  session.run("MATCH (n:Games) RETURN n").then(function(result) {
    var gameArr = [];
    result.records.forEach(function(record) {
      charArr.push({
        id: record._fields[0].identity.low,
        name: record._fields[0].properties.name
      });
    });
  });
});

// Add Game Route

router.post("/", function(req, res) {
  var month = req.body.month;
  var chapter = req.body.chapter;

  session
    .run("CREATE (n:Game {month:{month}, chapter: {chapter}})  RETURN n", {
      month,
      chapter
    })
    .then(function(result) {
      session.close();
    })
    .catch(function(error) {
      console.log(error);
    });
});

module.exports = router;
