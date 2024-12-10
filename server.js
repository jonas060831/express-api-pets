const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors")
const path = require('path');


const Pet = require("./models/pet.js")

mongoose.connect(process.env.MONGODB_URI);
app.use(cors())

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Routes go here

app.get('/', (req, res) => {
  res.send('Welcome to the Pets CRUD API!');
});

app.post('/pets', async(req, res) => {

  try {
    const createdPet = await Pet.create(req.body)

    res.json(createdPet)

  } catch (e) {
    res.status(400).json({ message: e.message})

  }
})


app.get('/pets', async(req, res) => {

  try {
    const foundPet = await Pet.find()

    res.send(foundPet)

  } catch (e) {
    res.status(400).json(e.message)
  }
})

app.delete('/pets/:petId', async(req, res) => {

  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.petId)

    if(deletedPet === null) return new Error(res.status(404).json({message: `provided Id does not exist in our Database Cannot Delete`}))

    res.json(deletedPet)

  } catch (e) {
    res.status(400).json(e.message)
  }
})

app.put('/pets/:petId', async(req, res) => {

  try {

    const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body, { new: true } )

    if(updatedPet === null) return new Error(res.status(404).json({ message: `provided Id does not exist in our Database Cannot Update` }))

    res.json(updatedPet)

  } catch (e) {
    console.log(e)
  }
})


app.listen(3000, () => {
  console.log('The express app is ready!');
});
