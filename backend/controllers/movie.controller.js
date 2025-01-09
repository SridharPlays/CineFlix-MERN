import mongoose from "mongoose"; // Importing MongoDB 
import Movie from "../models/movie.model.js"; // Importing the DB Schema

// A Function to get all the movies
export const getMovies = async (req, res) => {
	try {
		const movies = await Movie.find({});
		res.status(200).json({ success: true, data: movies });
	} catch (error) {
		console.log("Error in fetching movies:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}	
};

// Creating Movie Function
export const createMovies = async (req, res) => {
	const movie = req.body; // User will send this data [Request]

	// Assuming the required fields are name, genre, language, etc.
	if (!movie.name || !movie.image_loc || !movie.language) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newMovie = new Movie(movie);

	try {
		await newMovie.save();
		res.status(201).json({ success: true, data: newMovie });
	} catch (error) {
		console.error("Error in creating movie:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// Function to Update Movie Info's
export const updateMovies = async (req, res) => {
	const { id } = req.params;
	const movie = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Movie Id" });
	}

	try {
		const updatedMovie = await Movie.findByIdAndUpdate(id, movie, { new: true });
		res.status(200).json({ success: true, data: updatedMovie });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};


// Function to delete movies
export const deleteMovies = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Movie Id" });
	}

	try {
		await Movie.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Movie deleted" });
	} catch (error) {
		console.log("Error in deleting movie:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const getMovie = async (req, res) => {
	const { id } = req.params;

	try {
		const movie = await Movie.findById(id);
		res.status(200).json({ success: true, data: movie });
	} catch (error) {
		console.log("Error in fetching movies:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}	
};
