const express = require('express');
const router = express.Router();
const pokedex = require('../db/pokedex.json');

/* GET All Pokemon */
router.get('/', function (req, res, next) {
  res.json(pokedex);
});

/* GET Pokemon by English Name */
router.get('/name/:name', function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs

  const name = req.params.name.toLowerCase();

  const result = pokedex.find((pokemon) => {
    return (
      pokemon.name.english.toLowerCase() === name ||
      pokemon.name.chinese.toLowerCase() === name ||
      pokemon.name.french.toLowerCase() === name ||
      pokemon.name.japanese.toLowerCase() === name
    );
  });
  // console.log('pokemon: ', result);
  if (!result) {
    res.status(404).json({ error: 'Not found' });
    return next();
  }

  return res.status(200).json(result);
});

/* GET Pokemon by Type */
router.get('/type/:type', function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  const type = req.params.type;
  console.log(type);
  const capitalizedType = type.replace(type.at(0), type.at(0).toUpperCase());
  console.log(capitalizedType);
  const result = pokedex.filter((pokemon) => {
    return pokemon.type.includes(capitalizedType);
  });

  if (!result.length) {
    res.status(400).json({ error: 'Bad request' });
    return next();
  }
  return res.status(200).json(result);
});
/* GET Pokemon by HP */
router.get('/hp', function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs

  console.log('query: ', req.query);

  const { gt, lt, lte, gte } = req.query;
  console.log('gt: ', gt);
  console.log('lt: ', lt);
  let result = pokedex;

  if (gt) {
    result = result.filter((pokemon) => {
      return pokemon.base.HP > parseInt(gt);
    });
  }
  if (lt) {
    result = result.filter((pokemon) => {
      return pokemon.base.HP < parseInt(lt);
    });
  }
  if (gte) {
    result = result.filter((pokemon) => {
      return pokemon.base.HP >= parseInt(gt);
    });
  }
  if (lte) {
    result = result.filter((pokemon) => {
      return pokemon.base.HP <= parseInt(gt);
    });
  }

  if (!result.length) {
    return res.status(404).json({ error: 'Not found' });
  }
  if (!gt && !lt && !gte && !lte) {
    res.status(400).json({
      error: 'Invalid Operator. Must be one of ["gt","gte","lt","lte"]',
    });
    return;
  }
  console.log('result: ', result);

  return res.status(200).json(result);
});
/* GET Pokemon by Id. */
router.get('/:id', function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs

  const id = req.params.id;

  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID' });
    return next();
  }
  if (!pokedex[id]) {
    res.status(404).json({ error: 'Not found' });
    return next();
  }

  return res.status(200).json(pokedex[id - 1]);
});

module.exports = router;
