'use strict';
/**
 * This file is uttermost importance.
 * Gives a solid reference to all components, based on __dirname, a.k.a.
 * the directory in which this file resides.
 */
let ioc = require('electrolyte');
ioc.loader(ioc.node(__dirname));
module.exports = ioc;
