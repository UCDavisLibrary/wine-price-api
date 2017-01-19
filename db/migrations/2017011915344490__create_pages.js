'use strict';

const Nodal = require('nodal');

class CreatePages extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017011915344490;
  }

  up() {

    return [
      this.createTable("pages", [
        {"name":"user_id","type":"int"},
        {"name":"catalog_id","type":"int"},
        {"name":"page","type":"int"},
        {"name":"thumbnail","type":"buffer"},
        {"name":"thumbnail_contenttype","type":"text"},
        {"name":"image","type":"buffer"},
        {"name":"image_contenttype","type":"text"}
      ])
    ];

  }

  down() {

    return [
      this.dropTable("pages")
    ];

  }

}

module.exports = CreatePages;
