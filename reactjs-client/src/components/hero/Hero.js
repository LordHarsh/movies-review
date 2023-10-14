import React from "react";
import "./Hero.css";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export const Hero = ({ movies }) => {
  const navigate = useNavigate();
  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }

  return (
    <div>
      <Carousel
      >
        {movies.map((movie) => {
          return (
            <Paper key={movie.imdbId}>
              <div className="movie-card-container">
                <div
                  className="movie-card"
                  style={{ "--img": `url(${movie.backdrops[0]})` }}
                >
                  <div className="movie-detail">
                    <div className="movie-poster">
                      <img src={movie.poster} alt="" />
                    </div>
                    <div className="movie-title">
                      <h4 style={{fontWeight: 'bold'}}>{movie.title}</h4>
                    </div>
                    <div className="movie-buttons-container">
                      <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                      <div className="play-button-item-container">
                        <FontAwesomeIcon className="play-button-icon"
                          icon={faCirclePlay}
                        />
                      </div>
                      </Link>
                      <div className="movie-review-button-container">
                        <Button variant='outline-warning' onClick={()=>reviews(movie.imdbId)}><b>Reviews</b></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>
    </div>
  );
};
