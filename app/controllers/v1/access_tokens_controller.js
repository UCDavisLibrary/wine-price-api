'use strict';

const Nodal = require('nodal');
const AccessToken = Nodal.require('app/models/access_token.js');

const project = {
  default: ['id','user_id','access_token',
            {user:['username']}]
};

class V1AccessTokensController extends Nodal.Controller {

  index() {

    AccessToken.query()
    .join('user')
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models,project.default);

      });

  }

  create() {

    AccessToken.login(this.params, (err, accessToken) => {
      this.respond(err || accessToken);
    });

  }

  destroy() {
    AccessToken.logout(this.params,(err, accessToken) => {
      this.respond(err || accessToken);
    });
  }

}

module.exports = V1AccessTokensController;
