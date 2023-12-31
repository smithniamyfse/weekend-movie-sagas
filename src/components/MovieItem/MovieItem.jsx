import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { Link } from "react-router-dom";

function MovieItem({ movie }) {
  const shortDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "... ";
  };

  return (
    <Card sx={{ display: "flex", height: "100%", bgcolor: "#0A0C0D" }}>
      <Link to={`/details/${movie.id}`}>
        <CardMedia
          component="img"
          sx={{ width: "140px", height: "205px", objectFit: "cover", backgroundColor: "#0A0C0D"}}
          image={movie.poster}
          alt={movie.title}
        />
      </Link>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          align="left"
          sx={{ color: "#8372A8" }}
        >
          {movie.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="left"
          sx={{ color: "#AD9BBF" }}
        >
          {shortDescription(movie.description)}
        </Typography>
        {movie.description.length > 100 && (
          <Typography variant="body2" align="left">
            <Link to={`/details/${movie.id}`}>
              <Button size="medium" startIcon={<ReadMoreIcon />} style={{ color: "#C29D1E" }}>
                Read More
              </Button>
            </Link>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default MovieItem;

