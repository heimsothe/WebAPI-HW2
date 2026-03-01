/*
- File: server.js
- Author: Elijah Heimsoth
- Date: 03/01/2026
- Assignment: WebAPI-HW2
- Class: CSCI 3916

Description: Web API scaffolding for Movie API. Added /movie route to server app.
 */

var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var passport = require('passport');
var authController = require('./auth');
var authJwtController = require('./auth_jwt');
db = require('./db')(); //hack
var jwt = require('jsonwebtoken');
var cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

var router = express.Router();

function getJSONObjectForMovieRequirement(req) {
    var json = {
        headers: "No headers",
        env: process.env.UNIQUE_KEY,
        query: "No query"
    };

    if (req.query != null) {
        json.query = req.query;
    }

    if (req.headers != null) {
        json.headers = req.headers;
    }

    return json;
}

router.post('/signup', (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please include both username and password to signup.'})
    } else {
        var newUser = {
            username: req.body.username,
            password: req.body.password
        };

        db.save(newUser); //no duplicate checking
        res.json({success: true, msg: 'Successfully created new user.'})
    }
});

router.post('/signin', (req, res) => {
    var user = db.findOne(req.body.username);

    if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
        if (req.body.password == user.password) {
            var userToken = { id: user.id, username: user.username };
            var token = jwt.sign(userToken, process.env.SECRET_KEY);
            res.json ({success: true, token: 'JWT ' + token});
        }
        else {
            res.status(401).send({success: false, msg: 'Authentication failed.'});
        }
    }
});

router.route('/testcollection')
    .delete(authController.isAuthenticated, (req, res) => {
        console.log(req.body);
        res = res.status(200);
        if (req.get('Content-Type')) {
            res = res.type(req.get('Content-Type'));
        }
        var o = getJSONObjectForMovieRequirement(req);
        res.json(o);
    }
    )
    .put(authJwtController.isAuthenticated, (req, res) => {
        console.log(req.body);
        res = res.status(200);
        if (req.get('Content-Type')) {
            res = res.type(req.get('Content-Type'));
        }
        var o = getJSONObjectForMovieRequirement(req);
        res.json(o);
    }
    );

// /movies Route
router.route('/movies')
      // GET method
      // No Auth Required
      // Returns JSON object w/ status, message, headers, query, and env.
      .get((req, res) => {
        const o = getJSONObjectForMovieRequirement(req);
        o.status = 200;
        o.message = "GET movies";
        res.json(o);
      })

      // POST method
      // Requires JWT auth
      // Returns a JSON object w/ status, message, headers, query, and env.
      .post(authJwtController.isAuthenticated, (req, res) => {
        const o = getJSONObjectForMovieRequirement(req);
        o.status = 200;
        o.message = "movie saved";
        res.json(o);
      })

      // PUT method
      // Requires JWT auth
      // Returns a JSON object w/ status, message, headers, query, and env.
      .put(authJwtController.isAuthenticated, (req, res) => {
        const o = getJSONObjectForMovieRequirement(req);
        o.status = 200;
        o.message = "movie updated";
        res.json(o);
      })

      // DELETE method
      // Requires basic auth
      // Returns a JSON object w/ status, message, headers, query, and env.
      .delete(authController.isAuthenticated, (req, res) => {
        const o = getJSONObjectForMovieRequirement(req);
        o.status = 200;
        o.message = "movie deleted";
        res.json(o);
      })

      // ALL OTHER methods (not supported)
      // Returns 405 - method not allowed
      .all((req, res) => {
        res.status(405).send({ message: "HTTP method not supported."});
      })

app.use('/', router);
app.listen(process.env.PORT || 8080);
module.exports = app; // for testing only


