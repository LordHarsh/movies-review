import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import MovieCard from '../movieCard/MovieCard';
import './Search.css'; // Import your custom CSS for styling

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(searchQuery);
    try {
      const response = await api.get(`/api/v1/movies/search/${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  useEffect(() => {
    const search = async () => {
        try {
          const response = await api.get(`/api/v1/movies/search/${searchQuery}`);
          setSearchResults(response.data);
        } catch (error) {
          console.log(error);
          setError(error);
        }
      };
      if (searchQuery !== ""){
          search();
      }
  }, [searchQuery]);

  return (
    <Container className="search-container text-center">
      <h1 className="my-4">Movie Search</h1>
      <Form className="search-form" onSubmit={handleSearch}>
        <Form.Group className="mb-3" >
          <Form.Control
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline-warning" type='Submit'>
            Search
          </Button>
        </Form.Group>
      </Form>
      <Row>
        {searchResults.map((movie) => (
          <Col key={movie.imdbId} className="mb-3">
            <MovieCard movie={movie} deleteIconAbsent={true}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Search;
