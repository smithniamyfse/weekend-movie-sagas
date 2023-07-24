import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function MovieItem({ movie }) {
  const shortDescription = (text, maxLength = 100) => {
    // If the description is short enough, return the full text
    if (text.length <= maxLength) return text;

    // If the description is too long, trim it and add "Read More..."
    return text.substr(0, maxLength) + "... ";
  };

  return (
    <Card sx={{ display: "flex", maxWidth: 500 }}>
      <Link to={`/details/${movie.id}`}>
        <CardMedia
          component="img"
          image={movie.poster}
          alt={movie.title}
        />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {shortDescription(movie.description)}
          {movie.description.length > 100 && (
            <Link to={`/details/${movie.id}`}>
              Read More
            </Link>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MovieItem;



/*
function MovieItem({ movie }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/details/${movie.id}`}>
        <CardMedia
          component="img"
          sx={{ height: 140 }}
          image={movie.poster}
          alt={movie.title}
        />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
*/
