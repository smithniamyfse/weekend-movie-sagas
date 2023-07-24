// 💻 Importing required packages 💻
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const movieRouter = require('./routes/movie.router.js')
const genreRouter = require('./routes/genre.router.js')
const port = process.env.PORT || 5000;

/** 
 * ---------- MIDDLEWARE ----------
 * 📦 Body-parser middleware to handle JSON payloads 📦 
**/
app.use(bodyParser.json()); // needed for angular requests

/**
 * 👷 Serve up static files from the 'build' directory (created by npm run build) 👷
 */
app.use(express.static('build'));

/** 
 * ---------- ROUTES ----------
 * 🔀 These routes handle requests to /api/movie and /api/genre respectively 🔀
**/
app.use('/api/movie', movieRouter);
app.use('/api/genre', genreRouter)

/** 
 * ---------- START SERVER ----------
 * 🌐 Start our server so that it can begin listening to client requests. 🌐
 */
app.listen(port, function () {
    console.log('Listening on port: ', port);
});
