const express = require("express");
const router = express.Router();
const pokedex = require("../db/pokedex.json");

/* GET All Pokemon */
router.get("/", function (req, res, next) {
  res.json(pokedex);
});

/* GET Pokemon by HP */
router.get("/hp", function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs

  // Extract query parameters
  const lt = parseInt(req.query.lt);
  const gt = parseInt(req.query.gt);
  const lte = parseInt(req.query.lte);
  const gte = parseInt(req.query.gte);

  // Validate query parameters
  if ([lt, gt, lte, gte].every(param => isNaN(param))) {
    res.status(400).json({ 
      error: "Invalid Operator. Must be one of [\"gt\",\"gte\",\"lt\",\"lte\"]" 
    });
    return;
  }
    
  // Filter Pokémon based on HP
  const result = pokedex.filter(pokemon => {
    const hp = pokemon.base.HP;

    if (!isNaN(lt) && hp >= lt) {
      return false;
    }

    if (!isNaN(gt) && hp <= gt) {
      return false;
    }

    if (!isNaN(lte) && hp > lte) {
      return false;
    }

    if (!isNaN(gte) && hp < gte) {
      return false;
    }

    return true;
  });

  if (!result || result.length === 0) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  
  res.status(200).json(result);
  return;
});

/* GET Pokemon by Id. */
router.get("/:id", function (req, res, next) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID"});
    return;
  }

  result = pokedex.find(pokemon => pokemon["id"] === id);

  if (!result) {
    res.status(404).json({ error: "Not found"});
    return
  }

  res.status(200).json(result);
  return;
});

/* GET Pokemon by English Name */
router.get("/name/:name", function (req, res, next) {
  const name = req.params.name.toLowerCase();

  result = pokedex.find(pokemon => pokemon["name"]["english"].toLowerCase() === name);

  if (!result) {
    res.status(404).json({ error: "Not found"});
    return
  }

  res.status(200).json(result);
  return;
});

/* GET Pokemon by Type */
router.get("/type/:type", function (req, res, next) {
  const requestedType = 
    req.params.type.charAt(0).toUpperCase() + 
    req.params.type.slice(1).toLowerCase();

  const result = pokedex.filter(pokemon => pokemon.type.includes(requestedType));

  if (!result || result.length === 0) {
    res.status(400).json({ error: "Bad request"});
    return;
  }

  res.status(200).json(result);
  return;
});

module.exports = router;