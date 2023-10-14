import { useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Placeholder,
} from "react-bootstrap";
import { ReviewForm } from "../reviewForm/ReviewForm";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthContext } from "../../hooks/useAuthContext";
import React from "react";
import "./Reviews.css";

export const Reviews = ({
  getMovieData,
  movie,
  reviews,
  setReviews,
  setSuccessMessage,
}) => {
  const revText = useRef();
  let params = useParams();
  const { user } = useAuthContext();
  const movieId = params.movieId;

  useEffect(() => {
    getMovieData(movieId);
  }, []);

  const handleAddToWatchlist = async () => {
    try {
      const response = await api.post(
        "/api/v1/user/watchlist",
        {
          imdbId: movieId,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setSuccessMessage("Added to Watchlist");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        throw new Error("Something went wrong! Try again later.");
      }
    } catch (e) {
      console.log(e);
      alert(e.response.data.message);
    }
  };

  const addReview = async (e) => {
    e.preventDefault();
    const rev = revText.current;
    try {
      const response = await api.post("/api/v1/reviews", {
        reviewBody: rev.value,
        imdbId: movieId,
      });
      const updateReviews = [{ body: rev.value }, ...reviews];
      rev.value = "";
      setReviews(updateReviews);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Container>
        <Row className="mt-2 ">
          <Col
            className="poster-container"
            xs={12}
            md={6}
            style={{ position: "relative" }}
          >
            <Button
              onClick={handleAddToWatchlist}
              variant="warning"
              className="add-to-watchlist-button"
              style={{ position: "absolute", top: "30px", right: "30px" }}
            >
              <span className="add-button-text">Add to Watchlist</span>
              <FontAwesomeIcon className="mx-2" icon={faPlus} />
            </Button>
            {movie?.poster ? (
              <img className="poster" src={movie?.poster} alt="poster" />
            ) : (
              <Placeholder
                as="img"
                animation="glow"
                className="poster-placeholder"
              />
            )}
          </Col>
          <Col xs={12} md={6}>
            <Row className="ms-auto">
              <Col>
                <h1 className="mt-2 text-center pb-3" style={{ color: "gold" }}>
                  {movie ? (
                    movie.title
                  ) : (
                    <Placeholder animation="glow">
                      <Placeholder xs={12} />
                    </Placeholder>
                  )}
                </h1>
              </Col>
            </Row>
            <div className="review-section">
              <h3 className="mt-2 text-center">Reviews</h3>
              <Row className="mt-2">
                <Col>
                  <ReviewForm
                    handleSubmit={addReview}
                    revText={revText}
                    labelText="Write a Review?"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
              {reviews?.map((r, index) => (
                <div key={index} className="review">
                  {r.body}
                  <hr />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
