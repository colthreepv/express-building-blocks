'use strict';
const exec = require('child_process').exec;
process.env.NODE_ENV = 'production'; // trigger the use of bunyan

describe('the logger component', () => {
  it('should post log.error in process.stderr', (done) => {

    const testLib = require.resolve('./logger/throwerror');

    // execute node with the testing code program
    exec(`node ${ testLib }`, (err, stdout, stderr) => {
      if (err) return done(err);
      expect(stderr).to.have.string('this is an error');
      done();
    });

  });
});
