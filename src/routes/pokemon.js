const express = require("express");
const router = express.Router();
const pokedex = require("../db/pokedex.json");

/* GET All Pokemon */
router.get("/", function (req, res, next) {
  res.json(pokedex);
});

/* GET Pokemon by Id. */
router.get("/:id", function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  const pkid = parseInt(req.params.id);
  const pokemon = pokedex.find(({ id }) => id === pkid);

  if (!pokemon) {
    res.status(501).json({ message: "Not Implemented" });
  }
  res.json(pokemon);
  return;
});

/* GET Pokemon by English Name */
router.get("/name/:name", function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  const pkname = req.params.name;
  const pokemon = pokedex.find(({ name }) => name.english === pkname);

  if (!pokemon) {
    res.status(501).json({ message: "Not Implemented" });
  }
  console.log(pkname);
  res.json(pokemon);
  return;
});

/* GET Pokemon by Type */
router.get("/type/:type", function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  const pkType = req.params.type;

  const pokemon = pokedex.filter(({ type }) => type.includes(pkType));
  console.log(pkType);

  if (!pokemon) {
    res.status(501).json({ message: "Not Implemented" });
  }
  res.json(pokemon);
  return;
});

/* GET Pokemon by HP */
router.get("/hp", function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  const pkHp = parseInt(req.query.hp);
  const pokemon = pokedex.filter(({ base }) => base.HP <= pkHp);

  if (!pokemon) {
    res.status(501).json({ message: "Not Implemented" });
  }
  res.json(pokemon);
  return;
});

module.exports = router;
