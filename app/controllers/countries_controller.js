'use strict';

const Nodal = require('nodal');
const Country = Nodal.require('app/models/country.js');

class CountriesController extends Nodal.Controller {

  index() {

    Country.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models);

      });

  }

  show() {

    Country.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    Country.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    Country.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    Country.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = CountriesController;
