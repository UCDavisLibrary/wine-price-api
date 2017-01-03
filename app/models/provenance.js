'use strict';

const Nodal = require('nodal');
const User = Nodal.require('app/models/user.js');

class Provenance extends Nodal.Model {}

Provenance.setDatabase(Nodal.require('db/main.js'));
Provenance.setSchema(Nodal.my.Schema.models.Provenance);

Provenance.joinsTo(User,{multiple: true});

module.exports = Provenance;
