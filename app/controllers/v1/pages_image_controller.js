'use strict';

const _ = require('lodash');

const Nodal = require('nodal');
const Pages = Nodal.require('app/models/page.js');

class V1PagesImageController extends Nodal.Controller {

  show() {
    Pages
    .find(
      this.params.route.id,
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

module.exports = V1PagesImageController;
