'use strict';

let chalk = require('chalk');

let // local
  ioc = require('./ioc'),
  app = ioc.create('app');

app.set('port', process.env.PORT || 8080);
app.set('hostname', process.env.HOSTNAME || '127.0.0.1');

let server = app.listen(app.get('port'), app.get('hostname'), function () {
  console.log(chalk.green('Express server listening on:'), `http://${server.address().address}:${server.address().port}/`);
});
