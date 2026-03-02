# Assignment Two: Movies API
- Author: Elijah Heimsoth
- Date: 03/01/2026
- Assignment: WebAPI-HW2
- Class: CSCI 3916

## Description

An Express.js API server that handles HTTP requests for movie resources. Supports user registration and login with JWT-based authentication, and provides CRUD-style routes for `/movies` with mixed authentication strategies (JWT for POST/PUT, Basic Auth for DELETE). Deployed to Render with automated Postman tests.

## Postman Workspace

[Postman Workspace](https://www.postman.com/elijah-heimsoth-6556435/workspace/csci-3916-web-api-spring-2026)

### Postman Test Assertions
- `/signup` returns status 200 and a success message
- `/signin` returns status 200 and a JWT token
- `GET /movies` returns status 200 with message "GET movies"
- `POST /movies` with valid JWT returns status 200 with message "movie saved"
- `POST /movies` without JWT returns status 401 (unauthorized)
- `PUT /movies` with valid JWT returns status 200 with message "movie updated"
- `PUT /movies` without JWT returns status 401 (unauthorized)
- `DELETE /movies` with valid Basic Auth returns status 200 with message "movie deleted"
- `DELETE /movies` with incorrect Basic Auth returns status 401 (unauthorized)
- `PATCH /movies` returns status 405 (method not supported)

## API

### POST /signup

Registers a new user.

**Request:**
- Body (JSON): `{ "username": "string", "password": "string" }`

**Response:**
- Status: `200 OK`
- Body: `{ "success": true, "msg": "Successfully created new user." }`

### POST /signin

Authenticates a user and returns a JWT token.

**Request:**
- Body (JSON): `{ "username": "string", "password": "string" }`

**Response:**
- Status: `200 OK`
- Body: `"JWT <token>"`

### GET /movies

Returns movie resource information. No authentication required.

**Response:**
- Status: `200 OK`
- Body: `{ "status": 200, "message": "GET movies", "headers": {…}, "query": {…}, "env": "<UNIQUE_KEY>" }`

### POST /movies

Saves a movie. Requires JWT authentication.

**Request:**
- Header: `Authorization: JWT <token>`

**Response:**
- Status: `200 OK`
- Body: `{ "status": 200, "message": "movie saved", "headers": {…}, "query": {…}, "env": "<UNIQUE_KEY>" }`

### PUT /movies

Updates a movie. Requires JWT authentication.

**Request:**
- Header: `Authorization: JWT <token>`

**Response:**
- Status: `200 OK`
- Body: `{ "status": 200, "message": "movie updated", "headers": {…}, "query": {…}, "env": "<UNIQUE_KEY>" }`

### DELETE /movies

Deletes a movie. Requires HTTP Basic authentication.

**Request:**
- Header: `Authorization: Basic <base64(username:password)>`

**Response:**
- Status: `200 OK`
- Body: `{ "status": 200, "message": "movie deleted", "headers": {…}, "query": {…}, "env": "<UNIQUE_KEY>" }`

### All Other Methods on /movies

Any unsupported HTTP method (e.g., PATCH) returns an error.

**Response:**
- Status: `405 Method Not Allowed`
- Body: `{ "message": "HTTP method not supported." }`

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```
UNIQUE_KEY=<your unique key>
SECRET_KEY=<your JWT secret key>
```

## Running the Server

```bash
npm start
```

The server listens on port 8080 by default, or the port specified by the `PORT` environment variable.

## Running Tests

```bash
npm test
```

Runs the Mocha test suite, which verifies user signup/signin, JWT and Basic Auth on movie routes, and unsupported HTTP method handling.
