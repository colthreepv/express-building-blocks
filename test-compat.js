'use strict';

// let
//   ioc = require('./ioc'),
//   logger = ioc.create('components/logger');

let ioc = require('./ioc');

ioc.inject(function (log, logger) {
  // let testLogger = logger('testLogger');
  log.info('Hello World!');
});
