'use strict';

const _ = require('lodash');

const Nodal = require('nodal');
const Labels = Nodal.require('app/models/label.js');

class V1LabelsImageController extends Nodal.Controller {

  show() {
    Labels
    .find(
      this.params.route.id,
      ['id','contenttype','image'],
      (err, model)  => {
        var buffer;
        if (err) {
          this.respond(err);
        }
        buffer = model.get('image');

        this.setHeader(
          'Content-Type',
          model.get('image_contenttype') || 'application/octet-stream');
        this.render(buffer);

    });
  }

}

module.exports = V1LabelsImageController;
