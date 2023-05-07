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


  //make sure router.get("/hp", function (req, res, next) {...} has higher priority
  if (req.params.id === 'hp') 
    next('route');
  else {
    if ( /^([1-9]\d*)$/ .test(req.params.id) ) {
      let target = undefined;
      for(let i=0; i<pokedex.length;i++){
        if(pokedex[i].id == req.params.id)
        {
          target = pokedex[i];
          break;
        }
      }
  
      if(target!=undefined){
        res.status(200).json(target);
      } else {
        res.status(404).json({
          "error": "Not found"
        })
      }
    } else {
      res.status(400).json({
        "error": "Invalid ID"
      })
    }
    
    return;
  }

  
});

/* GET Pokemon by English Name */
router.get("/name/:name", function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  let target = undefined;
  for(let i=0; i<pokedex.length;i++){
    let found = false;


    for (let language in pokedex[i].name) {
      if( (pokedex[i].name)[language].toLowerCase()==req.params.name.toLowerCase())
      {
        found = true;
        target = pokedex[i];
        break;
      }
    }

    if(found == true)
      break;
  }

  console.log(target);
  if(target != undefined){
    res.status(200).json(target);
  } else {
    res.status(404).json({
      "error": "Not found"
    })
  }
  
  return;
});

/* GET Pokemon by Type */
router.get("/type/:type", function (req, res, next) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  let result = [];
  const ALL_TYPES = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"]; 
  const user_input_type = req.params.type.toLowerCase();
  let capital_str = [...user_input_type];
  capital_str = capital_str[0].toUpperCase() + user_input_type.slice(1);
  console.log(capital_str);
  
  if (ALL_TYPES.includes(user_input_type) ) {
    for(let i=0; i<pokedex.length; i++) {
      if( pokedex[i].type.includes(capital_str) )
      {
        result.push(pokedex[i]);
      }
    }
    res.status(200).json(result);
  } else {
    res.status(400).json({
      "error": "Bad request"
    })
  }
  return;
});

/* GET Pokemon by HP */
router.get("/hp", function (req, res) {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  
  // req.params(operator) Must be one of [\"gt\",\"gte\",\"lt\",\"lte\"]" 
  const ALL_OPERATORS = ["gt", "gte", "lt", "lte"];
  let found = false; 
  for(let operator in req.query ) {
    if (ALL_OPERATORS.includes(operator))
    {
      found = true;
    }
  }

  if(found) {


    const result = [];
    pokedex.forEach(
    (element)=>{

      let pokemon_HP_qualified = true;
      for(let operator in req.query ) {
        switch (operator) {
          case "gt":
            if( element.base.HP <= req.query[operator] )
              pokemon_HP_qualified = false;
            break;
          case "gte":
            if( element.base.HP < req.query[operator] )
              pokemon_HP_qualified = false;
            break;
          case "lt":
            if( element.base.HP >= req.query[operator] )
              pokemon_HP_qualified = false;
            break;
          case "lte":
            if( element.base.HP > req.query[operator] )
              pokemon_HP_qualified = false;
            break;
        }
      }
      if (pokemon_HP_qualified)
        result.push(element);

    })

    if (result.length != 0)
      res.status(200).json(result);
    else 
      res.status(404).json({
        "error": "Not found"
      })
  } else {
    res.status(400).json({
      "error": "Invalid Operator. Must be one of [\"gt\",\"gte\",\"lt\",\"lte\"]"
    });
  }

  return;
});

module.exports = router;
