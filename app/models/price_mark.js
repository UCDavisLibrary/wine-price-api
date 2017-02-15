'use strict';

const Nodal = require('nodal');

class PriceMark extends Nodal.Model {}

PriceMark.setDatabase(Nodal.require('db/main.js'));
PriceMark.setSchema(Nodal.my.Schema.models.PriceMark);

module.exports = PriceMark;
