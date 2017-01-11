'use strict';

const Nodal = require('nodal');

class Label extends Nodal.Model {}

Label.setDatabase(Nodal.require('db/main.js'));
Label.setSchema(Nodal.my.Schema.models.Label);

module.exports = Label;
