'use strict';

var path = require('path');
var components = path.join(__dirname, 'generic-components');

var ioc = require('electrolyte');

// order here is important, as reflects priority.
// first module found is returned
//
// In this example, local components have higher priority of generic ones.
ioc.use(ioc.node(__dirname));
ioc.use('components', ioc.node(components));
module.exports = ioc;
