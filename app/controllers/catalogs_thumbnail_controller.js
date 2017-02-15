'use strict';

const _ = require('lodash');

const Nodal = require('nodal');
const Catalog = Nodal.require('app/models/catalog.js');

class CatalogsThumbnailController extends Nodal.Controller {

  show() {
    Catalog
    .find(
      this.params.route.id,
      ['id','thumbnail','thumbnail_contenttype','title'],
      (err, model)  => {
        var buffer;
        if (err) {
          this.respond(err);
        }
        buffer = model.get('thumbnail');

        let type=model.get('thumbnail_contenttype');
        let suf = type.split('/').pop();
        let filename = model.get('title') || 'thumbnail';
        filename = `${filename}.${suf}`;

        this.setHeader(
          'Content-Type',
          type || 'application/octet-stream');

        this.setHeader('Content-Disposition',`inline; filename="${filename}"`);

        this.render(buffer);

    });
  }

}

module.exports = CatalogsThumbnailController;
