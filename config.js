'use strict';
/**
 * File that reads the appropriate YAML configuration and
 * exposes a module.exports with the content to node.js
 */
exports = module.exports = function (fs, path, jsYaml, extend) {
  let
    vars = jsYaml.load(fs.readFileSync(path.join(__dirname, './config.yml'))),
    configFile = (process.env.NODE_ENV === 'production') ? './config-dev.yml' : './config-dist.yml',
    keys = jsYaml.load(fs.readFileSync(path.join(__dirname, configFile)));

  return extend(true, keys, vars);
};

exports['@singleton'] = true;
