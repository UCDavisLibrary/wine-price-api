'use strict';

const Nodal = require('nodal');
const AccessToken = Nodal.require('app/models/access_token.js');
const UserAcl = Nodal.require('app/models/user_acl.js');

class AuthController extends Nodal.Controller {

  authorize(callback) {
    this.setHeader('Cache-Control', 'no-store');
    this.setHeader('Pragma', 'no-cache');

    AccessToken.verify(this.params,(err,accessToken,user)=> {
      if (err) {
        return this.respond(err);
      }
      callback(accessToken,user);
    });
  }

  is_admin(callback) {
    this.authorize( (accessToken,user) => {
      UserAcl.query().join('user')
      .where({user_id: user.get('id')})
      .end( (err,acls)=>{
        if (err) {
          return this.respond(err);
        }
        if ( !acls || !acls.length ) {
          return this.respond(`User has no ACLA`);
        }
        let acl=acls[0];
        if (! acl.get('admin')) {
          return this.respond(`User is not an admin`);
        }
        callback(accessToken,user);
      });
    });
  }

}

module.exports = AuthController;
