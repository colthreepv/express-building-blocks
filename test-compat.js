'use strict';

var ioc = require('./ioc');
ioc.inject(function (log, logger) {
  log.info('Hello World!');
  log.warning(new Error('This is a big failure sir'));
});
ioc.inject(require('./config'));

