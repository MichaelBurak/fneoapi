const express = require("express");
const router = express.Router();
const neo4j = require("neo4j-driver").v1;

const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "pass")
);

const session = driver.session();

// Add Item Route

router.post("/", function(req, res) {
  var name = req.body.name;

  session
    .run("CREATE (n:Item {name:{nameParam}})  RETURN n.name", {
      nameParam: name
    })
    .then(function(result) {
      // res.redirect("/");
      session.close();
    })
    .catch(function(error) {
      console.log(error);
    });
});

router.post("/contains", function(req, res) {
  var itemName = req.body.item;
  var component = req.body.component;
  var containAmount = req.body.containAmount;

  session
    .run(
      "MATCH (a:Item {name:{itemName}}),(b:Item {name: {component}}) CREATE (a)-[r:CONTAINS {amount:{containAmount}}]->(b) RETURN r",
      {
        itemName: itemName,
        component: component,
        containAmount: containAmount
      }
    )
    .then(function(result) {
      session.close();
    });
});

module.exports = router;
