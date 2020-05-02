import express from 'express';
// var path = require('path');
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import display from './routes/display';
import games from'./routes/games';

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static('images'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    next();
  });

app.use(games);
app.use(display);

export = app;
