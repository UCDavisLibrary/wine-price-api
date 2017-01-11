'use strict';

const Nodal = require('nodal');
const Language = Nodal.require('app/models/language.js');

class LanguagesController extends Nodal.Controller {

  index() {

    Language.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models);

      });

  }

  show() {

    Language.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    Language.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    Language.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    Language.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = LanguagesController;
