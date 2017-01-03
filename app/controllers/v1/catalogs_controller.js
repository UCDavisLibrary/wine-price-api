'use strict';

const _ = require('lodash');

const Nodal = require('nodal');
const Catalog = Nodal.require('app/models/catalog.js');
const AuthController=Nodal.require('app/controllers/auth_controller.js');

const project= {
  default:["id","title","publisher",
           "year"
          ],
  full:["id","title","publisher",
           "year",
        {user:["username"]}
       ]
};

class V1CatalogsController extends AuthController {

  index() {

    Catalog.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models,project.default);

      });

  }

  show() {
    Catalog
    .find(this.params.route.id,
          (err, model)  => {
            this.respond(err || model,project.full);
          });

  }

  create() {
    this.is_admin( ( accessToken, user ) => {
      let file=this.params.body.file;
      let data=_.omit(this.params.body,['file']);

      data.contenttype=file.contentType;
      data.filename=file.filename;
      data.contents=file;

      Catalog.create(data,(err, model) => {
        if (err) { this.respond(err) }
        this.respond(model);
      });
    });
  }

  update() {

    Catalog.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    Catalog.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1CatalogsController;
