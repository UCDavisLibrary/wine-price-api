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
        "year","contenttype",
        "thumbnail_contenttype",
        {user:["username"]}
       ]
};

class CatalogsController extends AuthController {

  index() {

    Catalog.query()
      .where(this.params.query)
      .end(project.default,
        (err, models) => {

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
      let file=this.params.body.contents;
      let thumbnail=this.params.body.thumbnail;
      let data=_.omit(this.params.body,['contents','thumbnail']);

      if (file) {
        data.contenttype=file.contentType;
        data.filename=file.filename;
        data.contents=file;
      }

      if (thumbnail) {
        data.thumbnail_contenttype=thumbnail.contentType;
        data.thumbnail=thumbnail;
      }

      Catalog.create(data,(err, model) => {
        if (err) { this.respond(err) }
          this.respond(model,project.default);
      });
    });
  }

  update() {
    this.is_admin( ( accessToken, user ) => {
      let file=this.params.body.file;
      let thumbnail=this.params.body.file;
      let data=_.omit(this.params.body,['file']);
      data.user_id=user.user_id;

      if (file) {
        data.contenttype=file.contentType;
        data.filename=file.filename;
        data.contents=file;
      }

      if (thumbnail) {
        data.thumbnail_contenttype=thumbnail.contentType;
        data.thumbnail=thumbnail;
        data.thumbnail_contenttype="foo";
      }

      Catalog.update(this.params.route.id,data, (err, model) => {
        this.respond(err || model,project.default);
      });
    });
  }

  destroy() {
    this.is_admin( ( accessToken, user ) => {
      Catalog.destroy(this.params.route.id, (err, model) => {
        this.respond(err || model,project.default);
      });
    });
  }

}

module.exports = CatalogsController;
