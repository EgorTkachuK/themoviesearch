
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useSearchParams } from 'react-router-dom';


const BASE = 'https://api.themoviedb.org/3';
const KEY = process.env.REACT_APP_TMDB_API_KEY;

const Wrap = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 20px;
`;
const Form = styled.form`
display: flex;
align-items: center;
gap: 10px;
`;
const Input = styled.input`
width:300px;
`;

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';
  const [q, setQ] = useState(queryParam);
  const [results, setResults] = useState([]);
  

  useEffect(() => {
    if (queryParam) {
      fetchMovies(queryParam);
    }
  }, [queryParam]);

  const fetchMovies = async (query) => {
    if (!query.trim()) return;
  
    try {
      const url = `${BASE}/search/movie?api_key=${KEY}&query=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      setResults([]);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!q.trim()) return;
    setSearchParams({ query: q });
  };

  return (
    <Wrap>
      <h1>Search Movies</h1>
      <Form onSubmit={onSubmit}>
        <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Movie title" />
        <button type="submit">Search</button>
      </Form>

     

      <ul>
        {results.map(r => (
          <li key={r.id}>
            <Link to={`/movies/${r.id}`}>{r.title}</Link>
          </li>
        ))}
      </ul>
    </Wrap>
  );
}


