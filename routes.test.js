/* eslint-disable no-console */

const request = require('supertest');
const { app, movies } = require('./routes');

describe('Film Explorer API', () => {
  beforeEach(() => {
    movies.set(135397, {
      id: 135397,
      overview: 'Twenty-two years after...',
      release_date: '2015-06-12',
      poster_path: '/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg',
      title: 'Jurassic World',
      vote_average: 6.9
    });
  });

  /* eslint-disable arrow-body-style */
  test('GET /api/movies should return all movies (mostly SuperTest)', () => {
    return request(app)
      .get('/api/movies')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toEqual(
          expect.stringContaining('json')
        );
        expect(response.body).toEqual(Array.from(movies.values()));
      });
  });

  test('GET /api/movies should return all movies (mostly SuperTest)', () => {
    return request(app)
      .get('/api/movies')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(Array.from(movies.values()));
  });

  test('PUT /api/movies/:id should update the movie (mostly SuperTest)', () => {
    const newMovie = Object.assign({}, movies.get(135397), { rating: 4 });
    return request(app)
      .put('/api/movies/135397')
      .send(newMovie)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(newMovie);
  });
  test('GET /api/movies/:id returns only movie with id=:id', () => {
    return request(app)
      .get('/api/movies/135397')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toEqual(
          expect.stringContaining('json')
        );
        expect(response.body).toEqual(movies.get(135397));
      });
  });
});
