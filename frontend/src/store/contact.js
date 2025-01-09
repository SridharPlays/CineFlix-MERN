import { create } from "zustand";

export const useMovieStore = create((set) => ({
  movies: [],
  movie: null,
  setMovies: (movies) => set({ movies }),

  getContact: async (id) => {
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
