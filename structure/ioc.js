'use strict';
/**
 * This file is uttermost importance.
 * Gives a solid reference to all components, based on __dirname, a.k.a.
 * the directory in which this file resides.
 */
var path = require('path');
var components = path.join(__dirname, '..', 'components');

let ioc = require('electrolyte');
ioc.loader(ioc.node(__dirname));
ioc.use('components', ioc.node(components));
module.exports = ioc;
