const express = require("express");
const router = express.Router();
const neo4j = require("neo4j-driver").v1;

const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "pass")
);

const session = driver.session();

// Add Character Route (C)

router.post("/", function(req, res) {
  var name = req.body.name;

  session
    .run("CREATE (n:Character {name:{nameParam}})  RETURN n.name", {
      nameParam: name
    })
    .then(function(result) {
      session.close();
    })
    .catch(function(error) {
      console.log(error);
    });
});

//Update character route
router.put("/", function(req, res) {
  var name = req.body.character;
  var newName = req.body.newName;
  session
    .run("MATCH (n:Character {name: {name}}) SET n.name = {newName} RETURN n", {
      name,
      newName
    })
    .then(function(result) {
      res.send(result);
      session.close();
    })
    .catch(function(error) {
      console.log(error);
    });
});

// Delete character route (D)

router.delete("/delete/:character", function(req, res) {
  var name = req.params.character;

  // console.log(name);
  session
    .run("MATCH (n:Character {name:{name}}) DETACH DELETE n", { name })
    .then(function(result) {
      session.close();
    });
});

module.exports = router;
