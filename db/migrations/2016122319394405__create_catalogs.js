'use strict';

const Nodal = require('nodal');

class CreateCatalogs extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2016122319394405;
  }

  up() {

    return [
      this.createTable(
        "catalogs",
        [
          {"name":"user_id","type":"int"},
          {"name":"title","type":"text"},
          {"name":"publisher","type":"text"},
          {"name":"year","type":"int"},
          {"name":"filename","type":"text"},
          {"name":"contenttype","type":"text"},
          {"name":"contents","type":"buffer"}
        ])
    ];

  }

  down() {

    return [
      this.dropTable("catalogs")
    ];

  }

}

module.exports = CreateCatalogs;
