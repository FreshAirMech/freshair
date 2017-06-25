// Load environment variables as quickly as possible for production
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')
const secrets = require('../secretsProd');
const env = process.env.NODE_ENV;
const app = express();
const db = require('./db');
const port = process.env.PORT || 3000;
const pg = require('pg');

app.use(morgan('dev'));

app.use(cookieSession({
  secret: secrets.SESSION_SECRET,
  maxAge: 1000 * 60 * 60 * 24 * 7
}));
app.use((req, res, next) => {
  if (req.session.user) {
    console.log(req.session);
  }
  next();
});

app.use(express.static(__dirname + '/../public/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', require('./routes'));

app.get('/*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);

  res
  .status(err.status || 500)
  .json({
    errorStatus: err.status || 500,
    message: err.message || 'Internal Server Error'
  });
});

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM users', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});

module.exports = app;