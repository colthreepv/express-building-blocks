'use strict';
/**
 * File that reads the appropriate YAML configuration and
 * exposes a module.exports with the content to node.js
 */
let // node
  fs = require('fs'),
  path = require('path');

let // modules
  yaml = require('js-yaml'),
  extend = require('extend');

exports = module.exports = function () {
  let
    vars = yaml.load(fs.readFileSync(path.join(__dirname, './config.yml'))),
    configFile = (process.env.NODE_ENV === 'production') ? './dist-keys.yml' : './dev-keys.yml',
    keys = yaml.load(fs.readFileSync(path.join(__dirname, configFile)));

  return extend(true, keys, vars);
};

exports['@singleton'] = true;
