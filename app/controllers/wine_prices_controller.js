'use strict';

const Nodal = require('nodal');
const WinePrice = Nodal.require('app/models/wine_price.js');
const AuthController=Nodal.require('app/controllers/auth_controller.js');

const project= {
  full:["user_id","type","color","country","varietal",
        "otherdesignation","brandname","winery_name",
        "vintage_date","region","bottlesize","perprice",
        "caseprice","priceyear","note","created_at","updated_at",
        {user : ["username"] } ]
};


class WinePricesController extends AuthController {

  index() {

    WinePrice.query()
      .join('user')
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models,project.full);

      });

  }

  show() {

    WinePrice.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    this.authorize( ( accessToken, user ) => {
      WinePrice.create(this.params.body, (err, model) => {
        this.respond(err || model);
      });
    });

  }

  update() {

    WinePrice.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    WinePrice.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = WinePricesController;
