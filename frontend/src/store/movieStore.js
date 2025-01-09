import { create } from "zustand";

export const useMovieStore = create((set) => ({
  movies: [],
  movie: null,
  setMovies: (movies) => set({ movies }),

  fetchMovies: async () => {
    try {
      const res = await fetch("/api/movies");
      if (!res.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await res.json();
      console.log(data.data);
      set({ movies: data.data });
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  },

  getMovie: async (id) => {
    try {
      const res = await fetch(`/api/movies/${id}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch movie with id: ${id}`);
      }
      const data = await res.json();
      set({ movie: data.data });
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  },
}));
