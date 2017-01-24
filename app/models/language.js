'use strict';

const Nodal = require('nodal');

class Language extends Nodal.Model {}

Language.setDatabase(Nodal.require('db/main.js'));
Language.setSchema(Nodal.my.Schema.models.Language);

module.exports = Language;
