/* eslint-disable no-console */

const express = require('express');

const app = express();
const movies = new Map();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/api/movies', (request, response) => {
  response.send(Array.from(movies.values()));
});

app.get('/api/movies/:id', (request, response) => {
  console.log('hit');
  const movieId = parseInt(request.params.id, 10);
  response.send(movies.get(movieId));
});

app.put('/api/movies/:id', (request, response) => {
  const movieId = parseInt(request.params.id, 10);
  const newMovie = request.body;
  const mergedMovie = Object.assign({}, movies.get(movieId), newMovie);
  movies.set(mergedMovie.id, mergedMovie);
  response.send(mergedMovie);
});

module.exports = {
  movies,
  app
};
