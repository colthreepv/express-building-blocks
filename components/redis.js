'use strict';

let Redis = require('ioredis');

exports = module.exports = function (config) {
  let client = new Redis(config.redis.port);
  for (let key in config.redis) {
    client[`@${key}`] = config.redis[key];
  }
  client['@expireTime'] = config.redis.expireTime;
  return client;
};
exports['@singleton'] = true;
exports['@require'] = ['config'];
