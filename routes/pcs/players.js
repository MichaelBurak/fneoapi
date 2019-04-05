//players {name: "player1"}

const express = require("express");
const router = express.Router();
const neo4j = require("neo4j-driver").v1;

const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "pass")
);

const session = driver.session();

// Add Player Route (C)

router.post("/", function(req, res) {
  session
    .run("CREATE (n:Player {name:{playerName}})  RETURN n.name", {
      playerName: req.body.playerName
    })
    .then(function(result) {
      res.send(result);
      session.close();
    })
    .catch(function(error) {
      console.log(error);
    });
});

//Update Player (name) Route

router.put("/", function(req, res) {
  var name = req.body.player;
  var newName = req.body.newName;
  session
    .run("MATCH (n:player {name: {name}}) SET n.name = {newName} RETURN n", {
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

// Delete player route (D)

router.delete("/delete/:player", function(req, res) {
  session
    .run("MATCH (n:Player {name:{name}}) DETACH DELETE n", {
      name: req.params.player
    })
    .then(function(result) {
      res.send(result);
      session.close();
    });
});

module.exports = router;
