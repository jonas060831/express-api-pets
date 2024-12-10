const mongoose = require("mongoose")
const { Schema, model } = mongoose

const petSchema = new Schema({

    name: { type: String, required: true },
    age: { type: Number, required: true },
    breed: { type: String, required: true }
})

const Pet = model("Pet", petSchema)

module.exports = Pet
