// 💻 Importing required packages 💻
const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

/**
 * 🔀 Route to GET all movies 
 * This route handles a GET request to the /api/movie endpoint.
 * It will run a SQL query to get all movies from the database, and then send the result back to the client.
 */
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

/**
 * 🔀 Route to POST a new movie
 * This route handles a POST request to the /api/movie endpoint.
 * It will run two SQL queries: one to insert a new movie into the 'movies' table, and another to insert a genre reference into the 'movies_genres' junction table.
 */
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

/**
 * 🔀 Route to GET a specific movie by its id
 * This route handles a GET request to the /api/movie/:id endpoint, where :id is the ID of the movie.
 * It will run a SQL query to get the movie details and all associated genres from the database, and then send the result back to the client.
 */
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

// 📤 Exports the router so it can be used by our server 📤
module.exports = router;
