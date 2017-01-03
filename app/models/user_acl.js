'use strict';

const Nodal = require('nodal');

const User = Nodal.require('app/models/user.js');


class UserAcl extends Nodal.Model {}

UserAcl.setDatabase(Nodal.require('db/main.js'));
UserAcl.setSchema(Nodal.my.Schema.models.UserAcl);

UserAcl.joinsTo(User, {multiple: true});

module.exports = UserAcl;
