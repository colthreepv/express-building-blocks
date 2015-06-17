// example components, not including mandrill in this package.json
let mandrillLib = require('mandrill-api/mandrill');

exports = module.exports = function (config) {
  let mandrill = new mandrillLib.Mandrill(config.Mandrill.KEY);

  return mandrill;
};
exports['@singleton'] = true;
exports['@require'] = ['config'];
