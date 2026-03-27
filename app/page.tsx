"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

function MovieCard({ movie }: { movie: any }) {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Poster';

  return (
    <div className={styles.movieCard}>
      <img src={posterUrl} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>Release: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
    </div>
  );
}

export default function MoviePage() {
const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const apiKey = "91dee199fa85e327f0045f67acd36c87";

  const fetchMovies = async () => {
    const url = searchTerm 
      ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}&page=${currentPage}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${currentPage}`;

    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results || []);
    setTotalPages(data.total_pages || 1);
  };

  useEffect(() => {
    fetchMovies();
  }, [searchTerm, currentPage]);

const sortMovies = (value: string) => {
    if (value === "default"){
      fetchMovies();
      return;
    };

    const sorted = [...movies].sort((a: any, b: any) => {
      // Release Date Sorting
      if (value === "release-asc") {
        return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
      }
      if (value === "release-desc") {
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      }
      
      // Rating Sorting
      if (value === "rating-asc") {
        return a.vote_average - b.vote_average;
      }
      if (value === "rating-desc") {
        return b.vote_average - a.vote_average;
      }
      
      return 0;
    });

    setMovies(sorted);
  };

  return (
    <main>
      <div className={styles.searchArea}>
        <input 
          type="text" 
          placeholder="Search for a movie..." 
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); 
          }} 
        />
        <select onChange={(e) => sortMovies(e.target.value)}>
          <option value="default">Sort By</option>
          <option value="release-asc">Release Date (Asc)</option>
          <option value="release-desc">Release Date (Desc)</option>
          <option value="rating-asc">Rating (Asc)</option>
          <option value="rating-desc">Rating (Desc)</option>
        </select>
      </div>

      <div className={styles.movieDisplay}>
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className={styles.navigation}>
        <button 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        
        <span>Page {currentPage} of {totalPages}</span>

        <button 
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </main>
  );
}