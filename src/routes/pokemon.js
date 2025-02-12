const express = require("express");
const router = express.Router();
const pokedex = require("../db/pokedex.json");

/* GET All Pokemon */
router.get("/", function (req, res, next) {
  res.json(pokedex);
});

/* GET Pokemon by HP */
router.get("/hp", function (req, res) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs

  const ALL_OPERATORS = ["gt", "gte", "lt", "lte"];
  let found = false;
  for (let operator in req.query) {
    if (ALL_OPERATORS.includes(operator)) {
      found = true;
    }
  }

  if (!found) {
    return res.status(400).json({
      "error": "Invalid Operator. Must be one of [\"gt\",\"gte\",\"lt\",\"lte\"]"
    });
  }

  const result = pokedex.filter(pokemon => {
    for (let operator in req.query) {
      switch (operator) {
        case "gt":
          if (!(pokemon.base && pokemon.base.HP > req.query[operator])) {
            return false;
          }
          break;
        case "gte":
          if (!(pokemon.base && pokemon.base.HP >= req.query[operator])) {
            return false;
          }
          break;
        case "lt":
          if (!(pokemon.base && pokemon.base.HP < req.query[operator])) {
            return false;
          }
          break;
        case "lte":
          if (!(pokemon.base && pokemon.base.HP <= req.query[operator])) {
            return false;
          }
          break;
      }
    }
    return true;
  });

  if (result.length > 0) {
    res.json(result);
  } else {
    res.status(404).json({
      "error": "Not found"
    });
  }
});

/* GET Pokemon by Id. */
router.get("/:id", function (req, res, next) {
  const id = req.params.id;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: "Invalid ID. Id must be number." });
  }

  const numericId = parseInt(id, 10);
  const pokemon = pokedex.find(pokemon => pokemon.id === numericId);

  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

/* GET Pokemon by English Name */
router.get("/name/:name", function (req, res, next) {
  const name = req.params.name.toLowerCase(); // Converte o nome para minúsculas para comparação case-insensitive

  const pokemon = pokedex.find(pokemon =>
    pokemon.name &&
    pokemon.name.english &&
    pokemon.name.english.toLowerCase() === name
  );

  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).json({
      error: `Pokémon with name '${req.params.name}' not found.`
    });
  }
});

/* GET Pokemon by Type */
router.get("/type/:type", function (req, res, next) {
  const type = req.params.type.toLowerCase();
  const validTypes = [
    "normal", "fire", "water", "electric", "grass", "ice", "fighting",
    "poison", "ground", "flying", "psychic", "bug", "rock", "ghost",
    "dragon", "dark", "steel", "fairy"
  ];

  if (!validTypes.includes(type)) {
    return res.status(400).json({
      message: `Invalid type. Valid types are: ${validTypes.join(", ")}`
    });
  }

  const filteredPokemon = pokedex.filter(pokemon =>
    pokemon.type.map(t => t.toLowerCase()).includes(type)
  );

  if (filteredPokemon.length > 0) {
    return res.json(filteredPokemon);
  } else {
    return res.status(404).json({
      message: `No Pokémon found with type: ${type}`
    });
  }
});

module.exports = router;
