'use strict';

const Nodal = require('nodal');

class CreateLabelCollections extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017011100195393;
  }

  up() {

    return [
      this.createTable("label_collections", [{"name":"title","type":"text"},{"name":"publisher","type":"text"}])
    ];

  }

  down() {

    return [
      this.dropTable("label_collections")
    ];

  }

}

module.exports = CreateLabelCollections;
