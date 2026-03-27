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
  return (
    <main>
      <div className={styles.searchArea}>
        {}
      </div>
      <div className={styles.movieDisplay}>
        {}
      </div>
    </main>
  );
}