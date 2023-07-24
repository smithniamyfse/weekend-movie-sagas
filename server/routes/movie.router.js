const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");


// Route to GET all movies 
router.get("/", (req, res) => {
  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
});


// Route to POST a new movie
router.post("/", (req, res) => {
  console.log(req.body);
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`;

  pool
    .query(insertMovieQuery, [
      req.body.title,
      req.body.poster,
      req.body.description,
    ])
    .then((result) => {
      console.log("New Movie Id:", result.rows[0].id);
      const createdMovieId = result.rows[0].id;
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);`;
      pool
        .query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id])
        .then((result) => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});


// Route to GET a specific movie by its id
router.get("/:id", (req, res) => {
    const movieId = req.params.id;
    const queryText = `
      SELECT movies.*, genres.name
      FROM movies
      JOIN movies_genres ON movies.id = movies_genres.movie_id
      JOIN genres ON movies_genres.genre_id = genres.id
      WHERE movies.id = $1;
    `;
  
    pool
      .query(queryText, [movieId])
      .then((result) => {
        const movieDetails = result.rows[0];
        movieDetails.genres = result.rows.map(row => row.name);
        res.send(movieDetails);
      })
      .catch((err) => {
        console.log("ERROR: GETting movie details", err);
        res.sendStatus(500);
      });
  });


module.exports = router;
