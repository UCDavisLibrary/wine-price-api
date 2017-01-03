'use strict';

const Nodal = require('nodal');

class CreateProvenances extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2016121820493770;
  }

  up() {

    return [
      this.createTable("provenances", [{"name":"user_id","type":"int"},{"name":"wine","type":"text"},{"name":"price","type":"float"},{"name":"source_id","type":"int"}])
    ];

  }

  down() {

    return [
      this.dropTable("provenances")
    ];

  }

}

module.exports = CreateProvenances;
