import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Container, Row, Col } from 'react-bootstrap';
import MovieCard from '../movieCard/MovieCard';

const Watchlist = ({ setSuccessMessage }) => {
    const [movies, setMovies] = useState([]);
    const { user } = useAuthContext();
    const [error, setError] = useState(null);

    const removeItem = (imdbId) => {
        const newMovies = movies.filter((movie) => movie.imdbId !== imdbId);
        setMovies(newMovies);
    }
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await api.get('/api/v1/user/watchlist', {
                    headers: {
                        "Authorization": `Bearer ${user?.token}`,
                        "Content-Type": "application/json",
                    }
                });
                setMovies(response.data.watchlist);
            } catch (error) {
                console.log(error);
                setError(error);
            }
        };
        fetchMovies();
    }, []);

    return (
        <Container className="text-center">
        <h1 className="my-4">My Watchlist</h1>
        {error && <p className="text-danger">Error: {error.message}</p>}
        <Row>
          {movies.map((movie) => (
            <Col key={movie.imdbId} className="mb-3">
              <MovieCard movie={movie} removeItem={removeItem} setSuccessMessage={setSuccessMessage} />
            </Col>
          ))}
        </Row>
      </Container>
    );
};

export default Watchlist;
