const express = require("express");
const router = express.Router();
const pokedex = require("../db/pokedex.json");

/* GET All Pokemon */
router.get("/", function (req, res, next) {
  res.json(pokedex);
});


/* GET Pokemon by HP */
router.get('/hp', function (req, res, next) {
  const validQueries = ['lt', 'lte', 'gt', 'gte']

  if (Object.keys(req.query).every(query => !validQueries.includes(query))) {
    return res.status(400).json({
      message: 'Invalid Operator. Must be one of ["gt","gte","lt","lte"]',
    });
  }
  const { lt, lte, gt, gte } = req.query;

  const pokemon = pokedex.filter(pokemon => {
    if (lt != null) {
      return pokemon.base.HP < lt;
    } else if (lte != null) {
      return pokemon.base.HP <= lte;
    } else if (gt != null) {
      return pokemon.base.HP > gt;
    } else if (gte != null) {
      return pokemon.base.HP >= gte;
    }
    return;
  });
  if (pokemon.length !== 0) {
    return res.json(pokemon);
  }
  res.status(404).json({ message: 'Not found' });
  return;
});

/* GET Pokemon by Id. */
router.get('/:id', function (req, res, next) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
  const pokemon = pokedex.find(pokemon => pokemon.id === id);
  if (pokemon != null) {
    return res.json(pokemon);
  }
  res.status(404).json({ message: 'Not found' });
  return;
});

/* GET Pokemon by English Name */
router.get('/name/:name', function (req, res, next) {
  const name = req.params.name;

  const pokemon = pokedex.find(
    pokemon => pokemon.name.english.toLowerCase() === name.toLowerCase()
  );
  if (pokemon != null) {
    return res.json(pokemon);
  }
  res.status(404).json({ message: 'Not found' });
  return;
});

/* GET Pokemon by Type */
router.get('/type/:type', function (req, res, next) {
  const type = req.params.type;

  const pokemon = pokedex.filter(pokemon =>
    pokemon.type.some(t => t.toLowerCase() === type.toLowerCase())
  );
  if (pokemon.length !== 0) {
    return res.json(pokemon);
  }
  res.status(400).json({ message: 'Bad request' });
  return;
});


module.exports = router;
