/* eslint-disable no-console */

const http = require('http');
const fs = require('fs');
const path = require('path');
const util = require('util');
const { movies, app } = require('./routes');

const readFile = util.promisify(fs.readFile);

readFile(path.join(__dirname, 'movies.json'))
  .then(contents => {
    // parse data
    const data = JSON.parse(contents);
    // load into movies Map
    data.forEach(entry => {
      movies.set(entry.id, entry);
    });
    // start server
    const server = http.createServer(app).listen(process.env.PORT || 3001);
    console.log('Listening on port %d', server.address().port);
  })
  .catch(err => {
    console.error(err);
  });
