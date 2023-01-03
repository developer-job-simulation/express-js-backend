const express = require("express");
const router = express.Router();
const pokedex = require("../db/pokedex.json");

/* GET All Pokemon */
router.get("/", function (req, res, next) {
  res.json(pokedex);
});

/* GET Pokemon by English Name */
router.get("/name/:name", function (req, res, next) {
  const filteredPokedex = pokedex.find(p => p.name.english.toLowerCase() === req.params.name)
  if (!filteredPokedex) {
    return res.status(404).json({
      error: "Not found"
    })
  }
  res.status(200).json(filteredPokedex);
});

/* GET Pokemon by Type */
router.get("/type/:type", function (req, res, next) {
  const filteredPokedex = pokedex.filter(p => p.type.map(s => s.toLowerCase()).includes(req.params.type))
  if (filteredPokedex.length === 0) {
    return res.status(400).json({
      error: "Bad request"
    })
  }
  res.status(200).json(filteredPokedex);
});

/* GET Pokemon by HP */
router.get("/hp", function (req, res, next) {
  if (Object.keys(req.query).every(k => k === 'lt' || k === 'gt' || k === 'lte' || k === 'gte') === false) {
    res.status(400).json({ error: 'Invalid Operator. Must be one of ["gt","gte","lt","lte"]' })
    return
  }
  const lt = req.query.lt
  const gt = req.query.gt
  const lte = req.query.lte
  const gte = req.query.gte
  const filteredPokedex = pokedex
    .filter(p => lt ? p.base.HP < lt : true)
    .filter(p => gt ? p.base.HP > gt : true)
    .filter(p => lte ? p.base.HP <= lte : true)
    .filter(p => gte ? p.base.HP >= gte : true)
  if (filteredPokedex.length === 0) {
    return res.status(404).json({ error: 'Not found' })
  }
  res.status(200).json(filteredPokedex);
});

/* GET Pokemon by Id. */
router.get("/:id", function (req, res, next) {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).json({error: "Invalid ID"})
  }
  const filteredPokedex = pokedex.find(p => p.id === Number(req.params.id))
  if (!filteredPokedex) {
    return res.status(404).json({
      error: "Not found"
    })
  }
  res.status(200).json(filteredPokedex);
});

module.exports = router;
