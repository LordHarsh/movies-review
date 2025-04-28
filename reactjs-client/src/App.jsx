import logo from "./logo.svg";
import "./App.css";
import api from "./api/axiosConfig.js";
import { useEffect, useState } from "react";
import { Layout } from "./components/Layout.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/home/Home.jsx";
import { Header } from "./components/header/Header.jsx";
import { Trailer } from "./components/trailer/Trailer.jsx";
import { Reviews } from "./components/reviews/Reviews.jsx";
import { Signup } from "./components/signup/Signup.jsx";
import { Login } from "./components/login/Login.jsx";
import { SuccessBanner } from "./components/successBanner/SuccessBanner.jsx";
import { useAuthContext } from "./hooks/useAuthContext.js";
import Watchlist from "./components/watchlist/Watchlist.jsx";
import Search from "./components/search/Search.jsx";

function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useAuthContext();

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data.movies);
      setReviews(response.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };
  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      console.log(response.data.movie);
      setMovie(response.data.movie);
      setReviews(
        response.data.movie.reviews.reverse()
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App" >
      <Header setSuccessMessage={setSuccessMessage}/>
      {successMessage && <SuccessBanner message={successMessage} />}
      <Routes>
        {movies && (
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home movies={movies} />}></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
            <Route
              path="/Reviews/:movieId"
              element={
                user ? (
                <Reviews
                  setSuccessMessage={setSuccessMessage}
                  getMovieData={getMovieData}
                  movie={movie}
                  reviews={reviews}
                  setReviews={setReviews}
                />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/signup"
              element={
                !user ? (
                  <Signup setSuccessMessage={setSuccessMessage} />
                ) : (
                  <Navigate to="/" />
                )
              }
            ></Route>
            <Route
              path="/login"
              element={
                !user ? (
                  <Login setSuccessMessage={setSuccessMessage} />
                ) : (
                  <Navigate to="/" />
                )
              }
            ></Route>
            <Route
              path='/watchlist'
              element={
                user ? (
                  <Watchlist setSuccessMessage={setSuccessMessage}/>
                ) : (
                  <Navigate to="/login" />
                )
              }
            ></Route>
            <Route
              path='/search'
              element={
                  <Search setSuccessMessage={setSuccessMessage}/>
              }
            ></Route>
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
