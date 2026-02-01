
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


import styled from 'styled-components';

const BASE = 'https://api.themoviedb.org/3';
const KEY = process.env.REACT_APP_TMDB_API_KEY;

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
`;

const CastList = styled.ul`
display: flex;
flex-direction: column;
gap: 8px;
`;

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    let mounted = true;
    const url = `${BASE}/movie/${movieId}/credits?api_key=${KEY}`;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then(data => mounted && setCast(data.cast || []))
      .catch(() => mounted && setCast([]));
    return () => (mounted = false);
  }, [movieId]);

  return (
    <Container>
      <h3>Cast</h3>
      <CastList>
        {cast.map(c => (
          <li key={c.credit_id}>
            {c.name} as {c.character}
          </li>
        ))}
      </CastList>
    </Container>
  );
}


