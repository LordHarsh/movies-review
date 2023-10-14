import React from "react";
import api from "../../api/axiosConfig";
import { Card, Button, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "./MovieCard.css";
import { useAuthContext } from "../../hooks/useAuthContext";

const MovieCard = ({ movie, removeItem, setSuccessMessage }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const handleReview = () => {
    navigate(`/Reviews/${movie.imdbId}`);
  };
  const handlePlay = () => {
    navigate(
      `/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`
    );
  };
  const handleDelete = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
      data: {
        imdbId: movie.imdbId,
      },
    };
    try {
      const response = await api.delete("/api/v1/user/watchlist", config);
      if (response.status === 200) {
        removeItem(movie.imdbId);
        setSuccessMessage("Removed from Watchlist");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        alert("Something went wrong! Try again later.");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Card className="m-auto" style={{ width: "18rem", borderColor: "gold" }}>
      <Card.Img variant="top" src={movie.backdrops[0]} />
      <Card.Body>
        <Card.Title style={{ color: "#ffc400", fontWeight: "bolder" }}>
          {movie.title}
        </Card.Title>
        <Card.Text>
          <b>Genres:</b> {movie.genres.join(", ")}
        </Card.Text>
        <Stack direction="horizontal" gap={2}>
          <div
            className="play-button-item-container play-trailer-div"
            onClick={handlePlay}
          >
            <FontAwesomeIcon
              className="p-2 play-trailer-icon"
              icon={faCirclePlay}
            />
          </div>
          <Button
            className="ms-auto review-btn"
            variant="primary"
            onClick={handleReview}
            style={{
              backgroundColor: "gold",
              borderColor: "#ffc400",
              fontWeight: "bolder",
              transition: "0.2s",
            }}
          >
            Review
          </Button>
          <div className="delete-button-div" style={{}}>
            <Button
              className="m-2 delete-button"
              variant="danger"
              onClick={handleDelete}
              style={{ transition: "0.2s" }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
