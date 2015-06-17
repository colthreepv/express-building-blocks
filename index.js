'use strict';

let // local
  ioc = require('./ioc'),
  app = ioc.create('app');

app.set('port', process.env.PORT || 8080);
app.set('hostname', process.env.HOSTNAME || '127.0.0.1');

let server = app.listen(app.get('port'), app.get('hostname'), function () {
  if (!process.env.SERVE_STATIC) { // means not started by gulp
    console.log('\x1b[36m%s\x1b[0m %s', 'Express server listening on:', 'http://' + server.address().address + ':' + server.address().port + '/');
  }
});
