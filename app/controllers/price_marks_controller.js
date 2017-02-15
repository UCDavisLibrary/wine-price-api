'use strict';

const Nodal = require('nodal');
const PriceMark = Nodal.require('app/models/price_mark.js');

class PriceMarksController extends Nodal.Controller {

  index() {

    PriceMark.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models);

      });

  }

  show() {

    PriceMark.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    PriceMark.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    PriceMark.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    PriceMark.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = PriceMarksController;
