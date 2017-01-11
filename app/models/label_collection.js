'use strict';

const Nodal = require('nodal');

class LabelCollection extends Nodal.Model {}

LabelCollection.setDatabase(Nodal.require('db/main.js'));
LabelCollection.setSchema(Nodal.my.Schema.models.LabelCollection);

module.exports = LabelCollection;
