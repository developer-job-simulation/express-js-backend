const express = require("express");
const router = express.Router();
const pokedex = require("../db/pokedex.json");

/* GET All Pokemon */
router.get("/", function (req, res, next) {
  res.json(pokedex);
});

/* GET Pokemon by Id. */
router.get("/:id", function (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const searchResult = pokedex.find(pokemon => pokemon.id === id);
    if (searchResult) res.status(200).json(searchResult);
    else res.status(404).json({ error: "Not found" });
  } catch (e) {
    res.status(400).json({ error: "Invalid ID" });
  }
  return;
});

/* GET Pokemon by English Name */
router.get("/name/:name", function (req, res, next) {
  const name = req.params.name.toLowerCase();
  const searchResult = pokedex.find(pokemon => `${pokemon.name.english}`.toLowerCase() == name);
  if (searchResult) res.status(200).json(searchResult);
  else res.status(404).json({ error: "Not found" });
  return;
});

/* GET Pokemon by Type */
router.get("/type/:type", function (req, res, next) {
  const qType = req.params.type.toLowerCase();
  const searchResults = pokedex.filter(pokemon => pokemon.type.find(type => type.toLowerCase() === qType));
  if (searchResults) res.status(200).json(searchResults);
  else res.status(404).json({ error: "Not found" });
  return;
});

/* GET Pokemon by HP */
router.get("/hp", function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  res.status(501).json({ message: "Not Implemented" });
  return;
});

module.exports = router;
