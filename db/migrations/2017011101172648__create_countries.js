'use strict';

const Nodal = require('nodal');

class CreateCountries extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017011101172648;
  }

  up() {

    return [
      this.createTable("countries", [
                                     {"name":"country","type":"text"}])
    ];

  }

  down() {

    return [
      this.dropTable("countries")
    ];

  }

}

module.exports = CreateCountries;
