const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secret = 'fipezo';

app.get('/', (req, res) => {
  res.json({
      message: 'Welcome to the API'
    });
});

app.get('/profile', verifyToken, (req, res) => {
  jwt.verify(req.token, secret, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    }
    else {
      res.json({
        message: 'Profile',
        authData
      });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
  else {
    res.sendStatus(403);
  }
}

app.post('/login', (req, res) => {
  const user = {
    id: 1,
    username: 'niladri',
    email: 'niladrix719@gmail.com'
  }
  jwt.sign({user},secret,{expiresIn: '30s'}, (err, token) => {
    if(err) {
      res.sendStatus(403);
    }
    res.json({
      token
    });
  });
});

app.listen(5000, () => console.log('Server started on port 5000'));