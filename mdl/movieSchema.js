const mongo = require("mongoose");

const movieSchema = new mongo.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  genre: { type: String, required: true },
  img: { type: String, required: true }
});

const Movie = mongo.model("Movie", movieSchema);

module.exports = Movie;
