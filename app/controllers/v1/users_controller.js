'use strict';

const Nodal = require('nodal');
const User = Nodal.require('app/models/user.js');

class V1UsersController extends Nodal.Controller {

  index() {

    User.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models,['id','username','email','created_at']);

      });

  }

  show() {

    User.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    User.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    User.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    User.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1UsersController;
