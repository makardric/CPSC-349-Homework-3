"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

// movie card component
function MovieCard({ movie }: { movie: any }) {
  // the poster url is given a placeholder initially
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Poster';

  // returns a movie card element with an image, a title, its release date, and its rating
  return (
    <div className={styles.movieCard}>
      <img src={posterUrl} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>Release: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
    </div>
  );
}

// "main" function for the movie page
export default function MoviePage() {
  
  // variables
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const apiKey = "91dee199fa85e327f0045f67acd36c87";

  // api fetch
  const fetchMovies = async () => {
    const url = searchTerm 
    // encodeURIComponent handles spaces and other special characters that the user might enter
    // if the user isn't searching for anything it defaults to showing the movies on the current page
    // if the user is searching for someting it will display movies that match the user's search terms
      ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}&page=${currentPage}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${currentPage}`;

    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results || []);
    setTotalPages(data.total_pages || 1);
  };

  // new movies are fetched according to the state array
  // either if the user is typing in the search bar or if the user is going to a different page
  useEffect(() => {
    fetchMovies();
  }, [searchTerm, currentPage]);

const sortMovies = (value: string) => {
    if (value === "default"){
      fetchMovies();
      return;
    };

    const sorted = [...movies].sort((a: any, b: any) => {
      // sorting the release date by seeing if the difference is positive or negative
      // if positive, the oldest movie goes first
      // if negative, the newest movie goes first
      if (value === "release-asc") {
        return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
      }
      if (value === "release-desc") {
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      }
      
      // same as sorting the release date but with the rating averages
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

  // html elements
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