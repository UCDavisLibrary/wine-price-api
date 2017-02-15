'use strict';

const _ = require('lodash');

const Nodal = require('nodal');
const Labels = Nodal.require('app/models/label.js');

class LabelsThumbnailController extends Nodal.Controller {

  show() {
    Labels
    .find(
      this.params.route.id,
      ['id','thumbnail_contenttype','thumbnail'],
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

module.exports = LabelsThumbnailController;
