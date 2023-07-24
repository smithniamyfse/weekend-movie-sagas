import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import "./MovieDetails.css";

function MovieDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const movieDetails = useSelector((state) => state.movieDetails);
  const { id } = useParams();

//   useEffect(() => {
//     dispatch({ type: "FETCH_MOVIE_DETAILS", payload: id });
//   }, [dispatch, id]);

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIE_DETAILS", payload: id });
  }, []);

  return (
    <main className="movie-details-container">
      <h1 className="h1-movie-details">{movieDetails.title}</h1>
      <Card
        sx={{
          bgcolor: "#0A0C0D",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", padding: "25px" }}>
          <CardMedia
            component="img"
            sx={{ width: "185px", height: "275px", objectFit: "contain" }}
            image={movieDetails.poster}
            alt={movieDetails.title}
          />
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="left"
              sx={{ color: "#8372A8" }}
            >
              {movieDetails.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="left"
              sx={{ color: "#AD9BBF" }}
            >
              {movieDetails.description}
            </Typography>
            {movieDetails.genres && (
              <Typography
                variant="body2"
                sx={{
                  color: "#C29D1E",
                  paddingTop: "10px",
                  fontStyle: "italic",
                }}
              >
                Genres: {movieDetails.genres.join(", ")}
              </Typography>
            )}
          </CardContent>
        </div>
        <CardContent sx={{ flexGrow: 1, padding: "25px" }}>
          <Button
            size="large"
            startIcon={<ArrowBackIosIcon />}
            style={{ color: "#C29D1E" }}
            onClick={() => history.push("/")}
          >
            Back to List
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

export default MovieDetails;
