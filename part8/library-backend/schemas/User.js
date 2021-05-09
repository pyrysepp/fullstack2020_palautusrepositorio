const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3,
  },
  password: String,
  favoriteGenre: String,
})
schema.plugin(uniqueValidator)
module.exports = mongoose.model("User", schema)
