'use strict';

const express = require('express');
const fs = require('fs');
const router = express.Router();

router.post('/', function(req, res, next) {
  var data = JSON.stringify(req.body);
  console.log('From the new router...')
  console.log(data);
  fs.promises.writeFile('var/subscriptions.json', data, {encoding:'utf8'})
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

module.exports = router
