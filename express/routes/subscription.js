'use strict';

const express = require('express');
const fs = require('fs');
const router = express.Router();

router.post('/', function(req, res, next) {
  var data = JSON.stringify(req.body) + '\n';
  console.log('From the new router...')
  console.log(data);
  fs.promises.appendFile('var/subscriptions.json', data, {encoding:'utf8'})
  .then(function(result) {
    res.json({status: 'subscribed'});
  })
  .catch(function(error) {
    res.status(500).json({'error': error});
  });
  /*
  * Example client-side call to fetch
  * fetch('/subscription',
    { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({one: 'two', three: 'four'}) })
    .then(function(response) { return response.json(); })
    .then(function(response) { console.log(response); });
  */
});

router.get('/public-key/', function(req, res, next) {
  res.json({vapid_public_key: process.env.VAPID_PUBLIC_KEY});
});

module.exports = router
