'use strict';

var ioc = require('./ioc');
ioc.create('components/logic');
ioc.create('components/test');

// As you can read up on ioc.js requesting this file it will print the app-specific version
ioc.create('components/overridable');
