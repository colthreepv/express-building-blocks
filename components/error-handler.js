'use strict';

exports = module.exports = function (logger) {
  let log = logger('errorHandler');

  // Some corner-case are known to generate errors 400, and those are *not* logged
  function errorHandler (err, req, res, next) {
    if (err && err instanceof SyntaxError) return res.sendStatus(500);

    log.error(err, 'express-level error', {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip
    });
    return res.sendStatus(500);
  }

  return errorHandler;
};
exports['@singleton'] = true;
exports['@require'] = ['components/logger'];
