'use strict';

const Nodal = require('nodal');

class CreateWinePrices extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2016122221214930;
  }

  up() {

    return [
      this.createTable("wine_prices", [{"name":"user_id","type":"int"},{"name":"type","type":"wine_type"},{"name":"color","type":"wine_color"},{"name":"country","type":"text"},{"name":"varietal","type":"text"},{"name":"otherdesignation","type":"text"},{"name":"brandname","type":"text"},{"name":"winery_name","type":"text"},{"name":"vintage_date","type":"int"},{"name":"region","type":"text"},{"name":"bottlesize","type":"wine_bottle"},{"name":"perprice","type":"float"},{"name":"caseprice","type":"float"},{"name":"priceyear","type":"int"},{"name":"note","type":"text"}])
    ];

  }

  down() {

    return [
      this.dropTable("wine_prices")
    ];

  }

}

module.exports = CreateWinePrices;
