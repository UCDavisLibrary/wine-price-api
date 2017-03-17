'use strict';

const Nodal = require('nodal');

class AddOcr extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017031319185451;
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

module.exports = AddOcr;
