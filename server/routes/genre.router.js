// 💻 Importing required packages 💻
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

/**
 *  🔀 Route to GET all genres
 *  This route handles a GET request to the /api/genre endpoint.
 *  It will run a SQL query to get all genres from the database, and then send the result back to the client.
 */
router.get('/', (req, res) => {
  // 👀 SQL query to get all genres 👀
  const queryText = `SELECT * FROM genres ORDER BY name ASC`;
  pool
    .query(queryText)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log(`Error GETting genres query: ${error}`);
        res.sendStatus(500);
    })
});

// 📤 Exports the router so it can be used by our server 📤
module.exports = router;
