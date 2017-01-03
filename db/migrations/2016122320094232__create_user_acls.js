'use strict';

const Nodal = require('nodal');

class CreateUserAcls extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2016122320094232;
  }

  up() {

    return [
      this.createTable("user_acls", [{"name":"user_id","type":"int"},{"name":"admin","type":"boolean"}])
    ];

  }

  down() {

    return [
      this.dropTable("user_acls")
    ];

  }

}

module.exports = CreateUserAcls;
