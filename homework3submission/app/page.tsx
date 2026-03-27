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
  const apiKey = "YOUR_TMDB_API_KEY";

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

  return (
    <main>
      <div className={styles.movieDisplay}>
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}