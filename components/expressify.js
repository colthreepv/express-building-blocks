exports = module.exports = function (logger) {
  let log = logger('controllerHandler');
  // returns a function awaiting a Promise-based controller
  return function (controllerFn) {

    let page = (controllerFn['@page']) ? controllerFn['@page'] : null;
    let redirect = (controllerFn['@redirect']) ? controllerFn['@redirect'] : null;

    // calls controllerFn and returns a classic express-handler function
    return function (req, res) {
      controllerFn(req)
      .then(function (payload) {
        if (redirect) return res.redirect(payload);
        if (page) return res.status(200).render(page, payload);
        res.status(200).send(payload);
      })
      .catch(XError, function (err) { // XError(s) are handled by developer
        if (process.env.Node_ENV !== 'production' && err._debug) {
          console.error('Error code: %d', err.code);
          err._debug.forEach(function (err) {
            console.error(err);
          });
        }

        let payload = {};
        if (err.code) payload.code = err.code; // add code if available

        if (err.httpResponse) {
          payload.message = err.httpResponse;
          log.error(err, 'handled error', { body: req.body, query: req.query, params: req.params, ip: req.ip, code: err.code, status: err.httpCode || 500, httpResponse: err.httpResponse });

          // response
          if (page) return res.status(err.httpCode || 500).render('error', payload);
          return res.status(err.httpCode || 500).send(payload);
        } else { // this kind of errors should "never" happen
          log.error(err, 'non-handled error', { body: req.body, query: req.query, params: req.params, ip: req.ip, debug: err._debug, code: err.code, status: err.httpCode || 500 });
          if (page) return res.status(err.httpCode || 500).render('error', payload);
          return res.sendStatus(err.httpCode || 500);
        }
      })
      .catch(Error, function (err) { // coding Error, or something not wrapped in an XError (still a coding error)
        log.error(err, 'coding error', { body: req.body, query: req.query, params: req.params, ip: req.ip, status: 500 });
        if (page) return res.status(500).render('error');
        return res.sendStatus(500);
      })
      .catch(function (err) {
        console.log('WTFFF');
        console.error(err.stack);
        return res.sendStatus(500);
      });
    };
  };
};
exports['@singleton'] = true;
exports['@require'] = ['components/logger'];
