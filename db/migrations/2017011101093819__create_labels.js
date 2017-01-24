'use strict';

const Nodal = require('nodal');

class CreateLabels extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017011101093819;
  }

  up() {

    return [
				this.createTable("labels",
												 [
														 {"name":"label_collection_id","type":"int"},
														 {"name":"title","type":"text"},
														 {"name":"type","type":"wine_type"},
														 {"name":"color","type":"wine_color"},
														 {"name":"country","type":"text"},
														 {"name":"language","type":"text"},
														 {"name":"varietal","type":"text"},
														 {"name":"otherdesignation","type":"text"},
														 {"name":"vintage_date","type":"int"},
														 {"name":"thumbnail","type":"buffer"},
														 {"name":"thumbnail_contenttype","type":"text"},
														 {"name":"image","type":"buffer"},
														 {"name":"image_contenttype","type":"text"},
												 ])
    ];

  }

  down() {

    return [
      this.dropTable("labels")
    ];

  }

}

module.exports = CreateLabels;
