const express = require('express')
const router = express.Router()
const pokedex = require('../db/pokedex.json')

/* GET All Pokemon */
router.get('/', function (req, res, next) {
  res.json(pokedex)
})

/* GET Pokemon by English Name */
router.get('/name/:name', function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  const name = req.params.name
  const foundPokemon = pokedex.find(
    (item) => item.name.english.toLowerCase() === name.toLowerCase()
  )
  if (foundPokemon) {
    return res.status(200).json(foundPokemon)
  }
  return res.status(404).json({ message: 'Not found' })
})

/* GET Pokemon by Type */
router.get('/type/:type', function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  let type = req.params.type
  type = type.charAt(0).toUpperCase() + type.slice(1)
  const foundPokemon = pokedex.filter((item) => item.type.includes(type))
  if (foundPokemon.length > 0) {
    return res.status(200).json(foundPokemon)
  }
  return res.status(400).json({ message: 'Bad request' })
})

/* GET Pokemon by HP */
router.get('/hp', function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  const query = req.query
  const filter = Object.keys(query)[0]
  const value = Number(query[filter])
  let foundPokemon = []
  switch (filter) {
    case 'gte':
      foundPokemon = pokedex.filter((item) => item.base.HP >= value)
      break
    case 'gt':
      foundPokemon = pokedex.filter((item) => item.base.HP > value)
      break
    case 'lt':
      foundPokemon = pokedex.filter((item) => item.base.HP < value)
      break
    case 'lte':
      foundPokemon = pokedex.filter((item) => item.base.HP <= value)
      break
    default:
      return res.status(400).json({
        error: 'Invalid Operator. Must be one of ["gt","gte","lt","lte"]',
      })
  }
  if (foundPokemon.length) {
    return res.status(200).json(foundPokemon)
  }
  return res.status(404).json({ message: 'Not found' })
})

/* GET Pokemon by Id. */
router.get('/:id', function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  const id = req.params.id
  const isNumber = id.match(/\d+/)
  if (!isNumber) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  const foundPokemon = pokedex.find((item) => item.id === Number(id))
  if (foundPokemon) {
    return res.status(200).json(foundPokemon)
  }

  return res.status(404).json({ message: 'Not found' })
})

module.exports = router
