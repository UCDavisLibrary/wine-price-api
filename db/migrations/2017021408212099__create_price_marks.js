'use strict';

const Nodal = require('nodal');

class CreatePriceMarks extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017021408212099;
  }

  up() {

    return [
      this.createTable("price_marks", [{"name":"user_id","type":"int"},{"name":"page_id","type":"int"},{"name":"r","type":"float"},{"name":"c","type":"float"},{"name":"type","type":"text"},{"name":"color","type":"text"},{"name":"country","type":"text"},{"name":"varietal","type":"text"},{"name":"otherdesignation","type":"text"},{"name":"brandname","type":"text"},{"name":"winery_name","type":"text"},{"name":"vintage_date","type":"int"},{"name":"region","type":"text"},{"name":"bottlesize","type":"text"},{"name":"perprice","type":"float"},{"name":"caseprice","type":"float"},{"name":"note","type":"text"}])
    ];

  }

  down() {

    return [
      this.dropTable("price_marks")
    ];

  }

}

module.exports = CreatePriceMarks;
