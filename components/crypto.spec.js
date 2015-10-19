'use strict';
var urlsafe = require('urlsafe-base64');
var component = ioc.create('components/crypto');

describe('crypto component', () => {
  it('should return urlsafe encrypted text', () => {
    var testBase64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var text = component.encrypt(testBase64);
    // console.log(text);

    expect(urlsafe.validate(text)).to.be.true;
    expect(text).to.not.match(/[\/\+]/);
  });

  it('should decode correctly the previous text', () => {
    // add more test strings
    var testStrings = [
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      '+ / \\ = ` ~ ! @ # $ % ^ & * ( ) " \' ; : [ ] { } | < > , . ?'
    ];

    var encodedStrings = testStrings.map((str) => {
      return component.encrypt(str);
    });

    var decodedStrings = encodedStrings.map((str) => {
      // console.log(str);
      return component.decrypt(str);
    });

    decodedStrings.forEach((str, idx) => {
      expect(str).to.be.equal(testStrings[idx]);
    });
  });
});
