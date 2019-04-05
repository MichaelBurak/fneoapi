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

//Valuation table
router.get("/charvalues/:character", function(req, res) {
  var charName = req.params.character;

  session
    .run(
      "MATCH (a:Character {name: {charName}})-[r:VALUES]->(b:Item) RETURN a, b, r",
      { charName }
    )
    .then(function(results) {
      var valTabl = [];
      // console.log(results.records);
      results.records.forEach(function(record) {
        record._fields.forEach(function(field) {
          console.log(field.properties);
        });
        // valTabl.push({
        //character:
        // console.log(record._fields[0].properties);
        //,
        //value:
        // console.log(record._fields[1].properties);
        //,
        //item:
        // console.log(record._fields[2].properties);
        // });
      });
    });
});

//Valuation singular get
router.get("/charvalues/:character/:item", function(req, res) {
  var charName = req.params.character;
  var itemName = req.params.item;
  // var val = req.body.value;

  session
    .run(
      "MATCH (a:Character {name: {charName}})-[r:VALUES]->(b:Item {name: {itemName}}) RETURN a, r, b",
      { charName, itemName }
    )
    .then(function(results) {
      console.log(results.records[0]._fields[0].properties);
      console.log(results.records[0]._fields[1].properties);
      console.log(results.records[0]._fields[2].properties);
    });
  // var charArr = [];
  // result.records.forEach(function(record) {
  //   charArr.push({
  //     id: record._fields[0].identity.low,
  //     name: record._fields[0].properties.name
  //   });
  // });
});

module.exports = router;
