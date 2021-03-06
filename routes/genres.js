const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Joi = require('joi');

const Genre = mongoose.model('vidlyGenre',  new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    validate: {
      validator: function(val){
        return val && val.length > 0
      },
      message: 'There should be one or more values in names'
    }
  }
}))

// get
router.get('/', async (req, res) => {
  const genre = await Genre.find().sort('name')
  res.send(genre)
})

// post
router.post('/', async (req, res) => {
  const {error} = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let genre = new Genre({name: req.body.name})
  genre = await genre.save()

  res.send(genre)
})


// put
router.put('/:id', async (req, res)=>{
  const {error} = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = await Genre.findByIdAndUpdate(req.params.id, {name : req.body.name}, {new : true})
  if (!genre) return res.status(404).send(error.details[0].message)

  res.send(genre)
})



// delete
router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id)

  if(!genre) return res.status(404).send('Item to delete not found')

  res.send(genre)
})

// getting a specific id
router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id)

  if (!genre) return res.status(404).send(`Item ${req.body.params} not found`)

  res.send(genre)
})


function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;