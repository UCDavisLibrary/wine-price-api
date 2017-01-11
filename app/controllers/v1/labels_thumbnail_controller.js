'use strict';

const _ = require('lodash');

const Nodal = require('nodal');
const Labels = Nodal.require('app/models/label.js');

class V1LabelsThumbnailController extends Nodal.Controller {

  show() {
    Labels
    .find(
      this.params.route.id,
      (err, model)  => {
        var buffer;
        if (err) {
          this.respond(err);
        }
        buffer = model.get('thumbnail');

        this.setHeader(
          'Content-Type',
          model.get('thumbnail_contenttype') || 'application/octet-stream');
        this.render(buffer);

    });
  }

}

module.exports = V1LabelsThumbnailController;
