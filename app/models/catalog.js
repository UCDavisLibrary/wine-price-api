'use strict';

const Nodal = require('nodal');

class Catalog extends Nodal.Model {}

Catalog.setDatabase(Nodal.require('db/main.js'));
Catalog.setSchema(Nodal.my.Schema.models.Catalog);

module.exports = Catalog;
