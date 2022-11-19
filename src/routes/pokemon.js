const express = require('express');
const router = express.Router();
const pokedex = require('../db/pokedex.json');

/* GET All Pokemon */
router.get('/', function (req, res, next) {
  res.json(pokedex);
});

/* GET Pokemon by HP */
router.get('/hp', function (req, res, next) {
  const filters = ['gt', 'gte', 'lt', 'lte'];
  Object.entries(req.query).forEach(([key, value]) => {
    if (!filters.includes(key)) {
      res
        .status(400)
        .json({
          error: 'Invalid Operator. Must be one of ["gt","gte","lt","lte"]',
        });
    }
  });
  const filteredPokemon = pokedex.filter(
    (pokemon) =>
      (!req.query.gt || pokemon.base.HP > req.query.gt) &&
      (!req.query.gte || pokemon.base.HP >= req.query.gte) &&
      (!req.query.lt || pokemon.base.HP < req.query.lt) &&
      (!req.query.lte || pokemon.base.HP <= req.query.lte)
  );

  if (!filteredPokemon.length) res.status(404).json({ error: 'Not found' });

  res.json(filteredPokemon);
  return;
});

/* GET Pokemon by Id. */
router.get('/:id', function (req, res, next) {
  if (isNaN(Number(req.params.id)))
    res.status(400).json({ error: 'Invalid ID' });

  const pokemon = pokedex.find((p) => p.id === Number(req.params.id));
  if (!pokemon) res.status(404).json({ error: 'Not found' });
  res.json(pokemon);
  return;
});

/* GET Pokemon by English Name */
router.get('/name/:name', function (req, res, next) {
  const pokemon = pokedex.find(
    (p) => p.name.english.toLowerCase() === req.params.name.toLowerCase()
  );
  if (!pokemon) res.status(404).json({ error: 'Not found' });
  res.json(pokemon);
  return;
});

/* GET Pokemon by Type */
router.get('/type/:type', function (req, res, next) {
  const types = [
    'normal',
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy',
  ];
  if (!types.includes(req.params.type.toLowerCase()))
    res.status(400).json({ error: 'Bad request' });

  const pokemon = pokedex.filter((p) =>
    p.type.some((t) => t.toLowerCase() === req.params.type.toLowerCase())
  );
  res.json(pokemon);
  return;
});

module.exports = router;
