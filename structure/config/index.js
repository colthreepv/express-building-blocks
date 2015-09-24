/**
 * File that reads the appropriate YAML configuration and
 * exposes a module.exports with the content to node.js
 */
'use strict';

let // node
  fs = require('fs'),
  path = require('path');

let // modules
  yaml = require('js-yaml'),
  extend = require('extend');

exports = module.exports = function () {
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
  let
    common = yaml.load(fs.readFileSync(path.join(__dirname, './common.yml'))),
    configName = (process.env.NODE_ENV === 'test') ? 'development' : process.env.NODE_ENV,
    configFile = `./${configName}.yml`,
    configData = yaml.load(fs.readFileSync(path.join(__dirname, configFile)));

  return extend(true, {}, configData, common);
};

exports['@singleton'] = true;
