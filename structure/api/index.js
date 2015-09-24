'use strict';

let // modules
  express = require('express');

exports = module.exports = function (validation, expressify) {
  let router = express.Router();

  router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
  });

  return router;
};
exports['@singleton'] = true;
exports['@require'] = ['components/validation', 'components/expressify'];
