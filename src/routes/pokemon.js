const express = require("express");
const router = express.Router();
const pokedex = require("../db/pokedex.json");
const pokemonTypes = require("../db/types.json");
const normalizedPokemonTypesSet = new Set(pokemonTypes.map(
  type => type.toLocaleLowerCase()
  ));

/* GET All Pokemon */
router.get("/", function (req, res, next) {
  res.json(pokedex);
});

/* GET Pokemon by English Name */
router.get("/name/:name", function (req, res, next) {
  const name = req.params.name;
  const pokemon = pokedex.find(
    pokemon => pokemon.name.english.toLocaleLowerCase() === name.toLocaleLowerCase()
    );
  if (!pokemon) return res.status(404).json({
    error: "Not found"
  });

  return res.status(200).json(pokemon);
});

/* GET Pokemon by Type */
router.get("/type/:type", function (req, res, next) {
  const type = req.params.type;
  
  if (!normalizedPokemonTypesSet.has(type)) return res.status(400).json({
    error: "Bad request"
  });

  const pokemons = pokedex.filter(pokemon => pokemon.type.find(ownType => ownType.toLocaleLowerCase() === type));
  return res.status(200).json(pokemons);
});

/* GET Pokemon by HP */
router.get("/hp", function (req, res, next) {
  const validQueryKeys = new Set(['gt', 'gte', 'lt', 'lte']);
  const operators = Object.keys(req.query);
  
  const hasInvalidOperator = operators.some(operator => !validQueryKeys.has(operator));
  if (hasInvalidOperator) {
    return res.status(400).json({
      error: 'Invalid operator'
    });
  }

  const comparisonFunctions = {
    lt: (a, b) => a < b,
    lte: (a, b) => a <= b,
    gt: (a, b) => a > b,
    gte: (a, b) => a >= b,
  };

  const pokemons = pokedex.filter(pokemon => {
    const hp = pokemon.base.HP;

    return operators.every(operator => {
      const value = Number(req.query[operator]);
      return comparisonFunctions[operator](hp, value);
    });
  });

  return res.status(200).json(pokemons);
});

/* GET Pokemon by Id. */
router.get("/:id", function (req, res, next) {
  const id = req.params.id;

  if (Number.isNaN(Number(id))) return res.status(400).json({
    error: 'Invalid ID'
  });
  
  const pokemon = pokedex.find(pokemon => pokemon.id = id)
  if (!pokemon) return res.status(404).json({
    error: 'Not found'
  });

  return res.status(200).json(pokemon);
});

module.exports = router;
