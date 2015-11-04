'use strict';
const path = require('path');
const ioc = require(path.join(process.cwd(), 'structure', 'ioc'));
const logger = ioc.create('components/logger');

const log = logger('testLogger');

log.error('this is an error');
