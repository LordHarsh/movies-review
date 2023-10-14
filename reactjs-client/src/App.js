import logo from "./logo.svg";
import "./App.css";
import api from "./api/axiosConfig";
import { useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/home/Home";
import { Header } from "./components/header/Header";
import { Trailer } from "./components/trailer/Trailer.js";
import { Reviews } from "./components/reviews/Reviews";
import { Signup } from "./components/signup/Signup";
import { Login } from "./components/login/Login";
import { SuccessBanner } from "./components/successBanner/SuccessBanner";
import { useAuthContext } from "./hooks/useAuthContext";
import Watchlist from "./components/watchlist/Watchlist";

function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const { user } = useAuthContext();

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
      setReviews(response.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };
  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      setMovie(response.data);
      setReviews(
        response.data.reviewIds.reverse().map((review) => JSON.parse(review))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
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
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
