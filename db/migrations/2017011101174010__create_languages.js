'use strict';

const Nodal = require('nodal');

class CreateLanguages extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017011101174010;
  }

  up() {

    return [
      this.createTable("languages", [{"name":"language","type":"text"}])
    ];

  }

  down() {

    return [
      this.dropTable("languages")
    ];

  }

}

module.exports = CreateLanguages;
