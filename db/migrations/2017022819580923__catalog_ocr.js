'use strict';

const Nodal = require('nodal');

class CatalogOcr extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017022819580923;
  }

  up() {

    return [
      this.addColumn('catalogs', 'ocr', 'text')
    ];

  }

  down() {

    return [
      this.dropColumn('catalogs', 'ocr')
    ];

  }

}

module.exports = CatalogOcr;
