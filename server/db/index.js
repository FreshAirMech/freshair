'use strict';
var db = require('./_db');

require('./models/user')(db);

module.exports = db;