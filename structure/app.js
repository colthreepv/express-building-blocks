'use strict';
let // node modules
  path = require('path');

let // modules
  express = require('express'),
  logger = require('morgan'),
  nunjucks = require('nunjucks'),
  bodyParser = require('body-parser');

require('./globals');

// Express starts here!
exports = module.exports = function (errorHandler) {
  let app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.engine('j2', nunjucks.render);
  app.set('view engine', 'j2');
  app.set('views', path.join(__dirname, 'pages'));
  app.set('x-powered-by', false); // disable x-powered-by header
  // use X-Forwarded-For header, in case you're using a front webserver (NGINX & friends)
  // this header is particularly useful to get the right reference when reading `req.ip`
  app.set('trust proxy', 1);

  // this is the perfect spot to include a static file serving handler here, or another app.use() middleware
  // requests handled by these middleware are not received by the logger

  // from here on, every request is logged by morgan
  if (process.env.NODE_ENV === 'production') {
    // morgan combined + response-time
    app.use(logger(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent"'));
  } else if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev')); // enables logging only if NOT testing
  }

  // attaching express.js 4.x routers here
  // app.use('/api', api);
  // app.use('/', pages);

  app.use(errorHandler);

  return app;
};

exports['@singleton'] = true;
exports['@require'] = ['components/errorHandler'];
