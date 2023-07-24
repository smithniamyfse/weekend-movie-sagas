const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

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

router.post("/", (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`;

  // FIRST QUERY MAKES MOVIE
  pool
    .query(insertMovieQuery, [
      req.body.title,
      req.body.poster,
      req.body.description,
    ])
    .then((result) => {
      console.log("New Movie Id:", result.rows[0].id);
      const createdMovieId = result.rows[0].id;

      // Now handle the genre reference
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);`;

      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool
        .query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id])
        .then((result) => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        })
        .catch((err) => {
          // catch for second query
          console.log(err);
          res.sendStatus(500);
        });
    })
    // Catch for first query
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});



router.get("/:id", (req, res) => {
    // Extract the movie ID from the request parameters.
    const movieId = req.params.id;
    // Define an SQL query to select all details for a specific movie.
    const queryText1 = `
      SELECT *
      FROM movies
      WHERE id = $1;
    `;
    // Define an SQL query to select all associated genre names for a specific movie.
    const queryText2 = `
      SELECT genres.name
      FROM genres
      JOIN movies_genres ON genres.id = movies_genres.genre_id
      WHERE movies_genres.movie_id = $1;
    `;
    // First run the query for movie details.
    pool
      .query(queryText1, [movieId])
      .then((result1) => {
        // Then run the query for genres.
        pool
          .query(queryText2, [movieId])
          .then((result2) => {
            // Combine the results.
            const movieDetails = result1.rows[0];
            movieDetails.genres = result2.rows.map(row => row.name);
            // Send the combined results.
            res.send(movieDetails);
          })
          .catch((err) => {
            console.log("ERROR: GETting genres", err);
            res.sendStatus(500);
          });
      })
      .catch((err) => {
        console.log("ERROR: GETting movie details", err);
        res.sendStatus(500);
      });
  });


module.exports = router;
  
/*
// GET request at the "/:id" endpoint, where ":id" is the movie's ID.
router.get("/:id", (req, res) => {
  // Extract the movie ID from the request parameters.
  const movieId = req.params.id;
  // Define an SQL query to select all movie details and associated genres for a specific movie.

  // Select all columns from the "movies" table, and create an array of all associated genre names. Name this array "genres".

  // Indicate that "movies" is the main table for this query.

  // Join the "movies" table with the "movies_genres" table on the matching movie IDs.

  // Join the "movies_genres" table with the "genres" table on the matching genre IDs.

  // Filter the results to only include the movie with the ID that matches the "movieId" variable.

  // Group the results by the movie ID.
  const queryText = `
    SELECT  array_agg(genres.name) as genres
    FROM movies
    JOIN movies_genres ON movies.id = movies_genres.movie_id
    JOIN genres ON movies_genres.genre_id = genres.id
    WHERE movies.id = $1
    GROUP BY movies.id;
  `;
  const queryValue = [movieId];
  pool
    .query(queryText, queryValue)
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.log("ERROR: GETting movie details", err);
      res.sendStatus(500);
    });
});
*/



  // Define an SQL query to select all movie details and associated genres for a specific movie.

  // Select all columns from the "movies" table, and create an array of all associated genre names. Name this array "genres".

  // Indicate that "movies" is the main table for this query.

  // Join the "movies" table with the "movies_genres" table on the matching movie IDs.

  // Join the "movies_genres" table with the "genres" table on the matching genre IDs.

  // Filter the results to only include the movie with the ID that matches the "movieId" variable.

  // Group the results by the movie ID.

/*
  const queryText = `
  SELECT "movies"."id" AS "movie_id",
  "movies"."title" AS "movie_title",
  "movies"."description" AS "movie_description",
  "genres"."id" AS "genre_id",
  "genres"."name" AS "genre_name",
  "movies_genres"."id" AS "movie_genre_id",
  "movies_genres"."movie_id" AS "movies_movie_id",
  "movies_genres"."genre_id" AS "movies_genre_id"
  FROM movies
  JOIN movies_genres ON movies.id = movies_genres.movie_id
  JOIN genres ON movies_genres.genre_id = genres.id
  WHERE movies.id = $1
  GROUP BY movies.id;
`;
*/