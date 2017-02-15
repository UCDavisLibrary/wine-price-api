'use strict';

const Nodal = require('nodal');
const Provenance = Nodal.require('app/models/provenance.js');
const AuthController=Nodal.require('app/controllers/auth_controller.js');

class ProvenancesController extends AuthController {

  index() {

    Provenance.query()
    .join('user')
    .where(this.params.query)
    .end((err, models) => {

        this.respond(err || models,['id','wine','price',{user: ['usename','email']}]);

      });

  }

  show() {

    Provenance.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    this.authorize(
      (accessToken, user )=> {

        this.params.body.user_id = user.get('id');

        Provenance.create(this.params.body, (err, model) => {

          this.respond(err || model);

        });

      }
    );
  }

  update() {

    Provenance.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    Provenance.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = ProvenancesController;
