const express = require("express");
const router = express.Router();
const neo4j = require("neo4j-driver").v1;

const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "pass")
);

const session = driver.session();

// Add Valuation Route

router.post("/", function(req, res) {
  var char = req.body.character;
  var item = req.body.item;
  var val = req.body.value;

  session.run(
    "MATCH(a:Character {name:{charParam}}),(b:Item {name: {itemParam}}) CREATE (a)-[r:VALUES { amount:{valParam}}]->(b) RETURN type(r), r.amount",
    {
      charParam: char,
      itemParam: item,
      valParam: val
    }
  );
});

module.exports = router;
