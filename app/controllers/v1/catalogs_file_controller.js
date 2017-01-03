'use strict';

const _ = require('lodash');

const Nodal = require('nodal');
const Catalog = Nodal.require('app/models/catalog.js');

class V1CatalogsFileController extends Nodal.Controller {

  show() {
    Catalog
    .find(
      this.params.route.id,
      (err, model)  => {
        var buffer;
        if (err) {
          this.respond(err);
        }
        buffer = model.get('contents');

        this.setHeader(
          'Content-Type',
          model.get('contenttype') || 'application/octet-stream');
        this.render(buffer);

    });
  }

}

module.exports = V1CatalogsFileController;
