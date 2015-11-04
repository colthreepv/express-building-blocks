'use strict';

let util = require('util');
let
  bunyan = require('bunyan'),
  chalk = require('chalk');

const colors = {
  log: chalk.bgBlack,
  info: chalk.bgWhite,
  error: chalk.bgRed,
  warn: chalk.bgYellow
};

// In testing bunyan gets mocked and outputted in console with timestamps
function mockLogger (level, type) {
  return function () { // builds something like ERROR: { data: 'hello world' }
    let args = Array.prototype.filter.call(arguments, function (arg) {
      if (arg instanceof Error) {
        util.log(arg.stack);
        return false;
      }
      return true;
    });
    Array.prototype.unshift.call(args, colors[level](type.toUpperCase()) + ':');
    util.log.apply(null, args);
  };
}

exports = module.exports = function (type) {
  if (process.env.NODE_ENV === 'production') {
    return bunyan.createLogger({ name: type, stream: process.stderr });
  }
  return {
    log: mockLogger('log', type),
    info: mockLogger('info', type),
    error: mockLogger('error', type),
    warn: mockLogger('warn', type)
  };
};
exports['@literal'] = true;
