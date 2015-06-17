'use strict';

let
  validation = require('express-validation'),
  ValidationError = validation.ValidationError;

// accept a function express-Handler type
exports = module.exports = function (logger) {
  let log = logger('validationHandler');
  validation.options({
    status: 422,
    statusText: 'Unprocessable Entity'
  });

  // this module creates a validation-wrapper that accepts a schema, like vanilla validation
  return function (schema) { // schema || controllerFn

    if (schema['@validation']) schema = schema['@validation'];
    let page = (schema['@page']) ? schema['@page'] : null;

    // that returns an express-compatible handler
    return function (req, res, next) {
      // that is promise-based
      Promise.fromNode(function (callback) {
        validation(schema)(req, undefined, callback); // function (req, res, next)
      })
      .then(next)
      .catch(ValidationError, function (err) {
        log.error(err, 'validation error', {
          body: req.body,
          query: req.query,
          params: req.params,
          ip: req.ip
        });

        if (page) return res.status(err.status).render('validationError');
        return res.status(err.status).json({ message: 'parameters did not pass validation, check errors', errors: err.errors });
      });
    };
  };

};
exports['@singleton'] = true;
exports['@require'] = ['components/logger'];
