const express = require("express");
const router = express.Router();
const pokedex = require("../db/pokedex.json");

/* GET All Pokemon */
router.get("/", function (req, res, next) {
  res.json(pokedex);
});

/* GET Pokemon by Id. */
router.get("/:id", function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  res.status(501).json({ message: "Not Implemented" });
  return;
});

/* GET Pokemon by English Name */
router.get("/name/:name", function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  res.status(501).json({ message: "Not Implemented" });
  return;
});

/* GET Pokemon by Type */
router.get("/type/:type", function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  res.status(501).json({ message: "Not Implemented" });
  return;
});

/* GET Pokemon by HP */
router.get("/hp", function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  res.status(501).json({ message: "Not Implemented" });
  return;
});

module.exports = router;
