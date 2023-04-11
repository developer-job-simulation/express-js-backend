const express = require("express");
const router = express.Router();
const pokedex = require("../db/pokedex.json");

/* GET All Pokemon */
router.get("/", function (req, res, next) {
  res.json(pokedex);
});

/* GET Pokemon by HP */
router.get("/hp", function (req, res, next) {
  const validComparators = new Set(["lt", "gt", "lte", "gte"]);
  const comparators = req.query;
  const comparatorKeys = Object.keys(comparators);
  for (let i = 0; i < comparatorKeys.length; i++) {
    if (!validComparators.has(comparatorKeys[i]))
      return res.status(400).json({
        error: 'Invalid Operator. Must be one of ["gt","gte","lt","lte"]',
      });
  }
  const comparatorToFn = {
    lt: (l, r) => l < r,
    gt: (l, r) => l > r,
    lte: (l, r) => l <= r,
    gte: (l, r) => l >= r,
  };
  function inHPRange(hp) {
    for (const [comp, value] of Object.entries(comparators)) {
      if (!comparatorToFn[comp](hp, Number(value))) return false;
    }
    return true;
  }
  const pokemons = pokedex.filter((el) => inHPRange(el.base.HP));

  if (!pokemons || pokemons.length === 0)
    return res.status(404).json({ error: "Not found" });

  return res.status(200).json(pokemons);
});

/* GET Pokemon by Id. */
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  if (!Number.isInteger(Number(id)))
    return res.status(400).json({ error: "Invalid ID" });

  const pokemon = pokedex.find((el) => el.id === Number(id));
  if (!pokemon) return res.status(404).json({ error: "Not found" });

  // console.log(pokemon);
  return res.status(200).json(pokemon);
});

/* GET Pokemon by English Name */
router.get("/name/:name", function (req, res, next) {
  let { name } = req.params;
  name = name.toLowerCase();
  const pokemon = pokedex.find((el) => el.name.english.toLowerCase() === name);

  if (!pokemon) return res.status(404).json({ error: "Not found" });
  return res.status(200).json(pokemon);
});

/* GET Pokemon by Type */
router.get("/type/:type", function (req, res, next) {
  let { type } = req.params;
  type = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  const pokemons = pokedex.filter((el) => el.type.includes(type));

  if (!pokemons || pokemons.length === 0)
    return res.status(400).json({ error: "Bad request" });

  return res.status(200).json(pokemons);
});

module.exports = router;
