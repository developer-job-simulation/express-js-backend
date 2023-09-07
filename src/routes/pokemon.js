const express = require("express");
const router = express.Router();
const pokedex = require("../db/pokedex.json");

/* GET All Pokemon */
router.get("/", function (req, res, next) {
  res.json(pokedex);
});

/* GET Pokemon by HP */
router.get("/hp", function (req, res, next) {
  const validOperators = ["gt", "gte", "lt", "lte"];

  // filter only valid operators
  const operators = validOperators.filter((op) => req.query[op] !== undefined);

  if (operators.length === 0)
    return res.status(400).json({
      error: 'Invalid Operator. Must be one of ["gt","gte","lt","lte"]',
    });

  const hpValues = {};
  // for every valid operator, find hp
  for (const operator of operators) {
    const hp = parseInt(req.query[operator]);
    if (isNaN(hp)) return res.status(400).json({ error: "Invalid HP value" });
    hpValues[operator] = hp;
  }

  // asign the operator to each key
  const comparisonFunctions = {
    gt: (a, b) => a > b,
    gte: (a, b) => a >= b,
    lt: (a, b) => a < b,
    lte: (a, b) => a <= b,
  };

  // filter pokemons, for every operator, with the respective hpValue
  const pokemons = pokedex.filter((pokemon) => {
    return operators.every((operator) =>
      comparisonFunctions[operator](pokemon.base.HP, hpValues[operator])
    );
  });

  if (pokemons.length > 0) {
    res.json(pokemons);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

/* GET Pokemon by Id. */
router.get("/:id", function (req, res, next) {
  const id = req.params.id;

  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const pokemon = pokedex.find((pokemon) => pokemon.id === parseInt(id));

  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).json({ error: "Not found" });
  }
  return;
});

/* GET Pokemon by English Name */
router.get("/name/:name", function (req, res, next) {
  const name = req.params.name.toLowerCase();

  const pokemon = pokedex.find(
    (pokemon) => pokemon.name.english.toLowerCase() === name
  );

  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).json({ error: "Not found" });
  }
  return;
});

/* GET Pokemon by Type */
router.get("/type/:type", function (req, res, next) {
  const type = req.params.type.toLowerCase();

  const pokemon = pokedex.filter((pokemon) =>
    pokemon.type.some((typeName) => typeName.toLowerCase() === type)
  );

  if (pokemon.length > 0) {
    res.json(pokemon);
  } else {
    res.status(404).json({ error: "Bad request" });
  }
  return;
});

module.exports = router;
