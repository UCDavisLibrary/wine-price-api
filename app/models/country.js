'use strict';

const Nodal = require('nodal');

class Country extends Nodal.Model {}

Country.setDatabase(Nodal.require('db/main.js'));
Country.setSchema(Nodal.my.Schema.models.Country);

module.exports = Country;
