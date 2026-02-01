
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const BASE = 'https://api.themoviedb.org/3';
const KEY = process.env.REACT_APP_TMDB_API_KEY;

const Wrap = styled.main`
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
gap: 20px;
`;

const Item = styled.li`
display: flex;
flex-direction: column;
align-items: center;
`;

export default function Home() {
  const [movies, setMovies] = useState([]);
 

  useEffect(() => {
    let mounted = true;
    const url = `${BASE}/trending/movie/day?api_key=${KEY}`;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then(data => mounted && setMovies(data.results || []))
      .catch(() => mounted && setMovies([]))
     
    return () => (mounted = false);
  }, []);



  return (
    <Wrap>
      <h1>Trending Today</h1>
     
        {movies.map(m => (
          <Item key={m.id}>
            <Link to={`/movies/${m.id}`}>
              <img
                src={m.poster_path ? `https://image.tmdb.org/t/p/w200${m.poster_path}` : ''}
                alt={m.title}
                style={{ width: '200px', borderRadius: 6 }}
              />
              <div>{m.title}</div>
            </Link>
          </Item>
        ))}
     
    </Wrap>
  );
}


