'use strict';

const Nodal = require('nodal');
const UserAcl = Nodal.require('app/models/user_acl.js');

const project = {
  default: ['id','user_id','admin',
            {user:['username']}]
};

class UserAclsController extends Nodal.Controller {

  index() {

    UserAcl.query()
      .join('user')
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models,project.default);

      });

  }

  show() {

    UserAcl.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    UserAcl.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    UserAcl.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    UserAcl.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = UserAclsController;
