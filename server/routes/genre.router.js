const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


// Route to GET all genres
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


module.exports = router;
