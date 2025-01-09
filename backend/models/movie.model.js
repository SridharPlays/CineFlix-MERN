import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image_loc: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  format: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  length: {
    type: String,
    required: true
  },
  imdb_rating: {
    type: Number,
    required: true
  },
  age_rating: {
    type: String,
    required: true
  },
  story: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  writer: {
    type: String,
    required: true
  },
  stars: {
    type: [String],
    required: true
  },
  trailer: {
    type: String,
    required: true
  },
  music: {
    type: String,
    required: true
  }
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;