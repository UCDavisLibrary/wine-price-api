'use strict';

const Nodal = require('nodal');

const User = Nodal.require('app/models/user.js');

class WinePrice extends Nodal.Model {}

WinePrice.setDatabase(Nodal.require('db/main.js'));
WinePrice.setSchema(Nodal.my.Schema.models.WinePrice);

WinePrice.joinsTo(User,{multiple:true});

//WinePrice.validates('perprice','If exists, must be Greater than 0',v => !v || v > 0);

module.exports = WinePrice;
