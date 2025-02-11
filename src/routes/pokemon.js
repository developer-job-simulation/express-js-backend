const express = require("express");
const router = express.Router();
const pokedex = require("../db/pokedex.json");
const { search } = require("./pokemon");

/* GET All Pokemon */
router.get("/", function (req, res, next) {
  res.json(pokedex);
});

/* GET Pokemon by HP */
router.get("/hp", function (req, res, next) {
  const queryKeys = Object.keys(req.query);
  if (!queryKeys.length) return res.status(404).json({ error: "Not found" });

  /**
   * @returns {Boolean} if a given value tests valid with the respective query
   */
  function testQuery(query, value) {
    switch (query) {
      case 'gt': return value > req.query["gt"];
      case 'lt': return value < req.query["lt"];
      case 'gte': return value > req.query["gte"];
      case 'lte': return value < req.query["lte"];
      default: res.status(400).json({ error: 'Invalid Operator. Must be one of ["gt","gte","lt","lte"]' })
    }
  }

  const searchResults = pokedex.filter(pokemon =>
    queryKeys.reduce((isPassed, query) =>
      isPassed = isPassed ? testQuery(query, pokemon.base.HP) : false
      , true));
  if (searchResults.length) res.status(200).json(searchResults);
  else res.status(404).json({ error: "Not found" })
  return;
});

/* GET Pokemon by Id. */
router.get("/:id", function (req, res, next) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
  const searchResult = pokedex.find(pokemon => pokemon.id === id);
  if (searchResult) res.status(200).json(searchResult);
  else res.status(404).json({ error: "Not found" });
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
  if (searchResults.length) res.status(200).json(searchResults);
  else res.status(400).json({ error: "Bad request" });
  return;
});

module.exports = router;
