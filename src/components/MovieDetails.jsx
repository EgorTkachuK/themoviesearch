
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link, Outlet } from 'react-router-dom';


const BASE = 'https://api.themoviedb.org/3';
const KEY = process.env.REACT_APP_TMDB_API_KEY;

const Wrap = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 15px;
`;

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);


  useEffect(() => {
    let mounted = true;
    const url = `${BASE}/movie/${movieId}?api_key=${KEY}`;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then(data => mounted && setMovie(data))
      .catch(() => mounted && setMovie(null))
  
    return () => (mounted = false);
  }, [movieId]);

 
  if (!movie) return <Wrap>Movie not found</Wrap>;

  return (
    <Wrap>
      <Link to="/movies">← Back to search</Link>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Release date: {movie.release_date}</p>
      <nav>
        <Link to={`cast`}>Cast</Link> | <Link to={`reviews`}>Reviews</Link>
      </nav>

      <section >
        <Outlet />
      </section>
    </Wrap>
  );
}


