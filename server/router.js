// var requestHandler = require('./request-handler');
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/index', function (req, res) {
  res.sendFile(path.join(__dirname,'../client', 'index.html'));
});

// router.post('/*', function(req, res) {
//   console.log('POST to unknown page - redirecting to homepage.');
//   res.redirect('/');
// });

// router.get('/*', function (req, res) {
//   res.redirect('/');
// });

module.exports = router;
