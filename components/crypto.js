/**
 * crypto is a component to let you crypt/decrypt short messages
 * for long streams a Buffer-approach is strongly suggested
 */
let crypto = require('crypto');

/**
 * @uses [Config] configuration for this process instance
 */
exports = module.exports = function (config) {
  function encrypt (text) {
    let cipher = crypto.createCipher(config.crypto.algorithm, config.crypto.secret);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }

  function decrypt (text) {
    let decipher = crypto.createDecipher(config.crypto.algorithm, config.crypto.secret);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }

  return {
    encrypt: encrypt,
    decrypt: decrypt
  };
};

exports['@singleton'] = true;
exports['@require'] = ['config'];

