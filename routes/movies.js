const express = require("express");
const mongo = require("mongoose");
const moviesSchema = require("../mdl/movieSchema.js")
const axios = require('axios')


const router = express.Router()

const validateMovie = async (title, year) => {
  return await moviesSchema.findOne({ title: title, year: year });
};
const findPoster = async (title) => {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDB_API}`);
    return response.data.Poster || "/placeholders/poster.png"; 
  } catch (error) {
    console.error("Error fetching poster:", error);
    return "/placeholders/poster.png";
  }
};


router.get('/', async (req,res) => {
  try {
    const movies = await moviesSchema.find();
    res.json(movies);
  } catch (error) {
    console.error(error)
    res.status(500).send({msg: "internal server error"})
  }
})

router.get('/search', async (req,res) => {
  try {
    const title = req.query.title
    const movie = await moviesSchema.findOne({ title: title });

    if (!title) {
      return res.status(400).json({ msg: "title is required" });
    }

    if (!movie) {
      return res.status(404).json({ msg: "movie not found" });
    }

    res.json(movie)
  } catch (error) {
    console.error(error)
    res.status(500).json({msg: "internal server error"})
  }
})

router.post('/new', async (req, res) => {
  try {
    const { title, year, genre, img } = req.body;

    if (!title || !year || !genre) {
      return res.status(400).json({ msg: "all fields are required" });
    }

    const existingMovie = await validateMovie(title, year);
    if (existingMovie) {
      return res.status(409).json({ msg: "movie exists already" });
    }
    const poster = img || await findPoster(title);

    const movie = new moviesSchema({
      title,
      year,
      genre,
      img: poster
    });

    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "internal server error" });
  }
});




module.exports = router