
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const BASE = 'https://api.themoviedb.org/3';
const KEY = process.env.REACT_APP_TMDB_API_KEY;

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 15px;
`;

const ReviewsList = styled.ul`
display: flex;
flex-direction: column;
gap: 15px;
`;

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let mounted = true;
    const url = `${BASE}/movie/${movieId}/reviews?api_key=${KEY}`;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then(data => mounted && setReviews(data.results || []))
      .catch(() => mounted && setReviews([]));
    return () => (mounted = false);
  }, [movieId]);

  if (!reviews.length) return <Container>No reviews yet</Container>;

  return (
    <Container>
      <h3>Reviews</h3>
      <ReviewsList>
        {reviews.map(r => (
          <li key={r.id}>
            <p><strong>{r.author}</strong></p>
            <p>{r.content}</p>
          </li>
        ))}
      </ReviewsList>
    </Container>
  );
}

