import express from "express"
import { createMovies, deleteMovies, getMovies, updateMovies, getMovie } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/", getMovies);
router.post("/", createMovies);
router.put("/:id", updateMovies);
router.delete("/:id", deleteMovies);
router.get("/:id", getMovie);

export default router;