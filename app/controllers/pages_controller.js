'use strict';

const _ = require('lodash');
const Nodal = require('nodal');
const Page = Nodal.require('app/models/page.js');
const AuthController=Nodal.require('app/controllers/auth_controller.js');

const project= {
  default:["id","catalog_id","page","created_at","updated_at"
          ],
  full:["id","page",
        "created_at","updated_at",
        {catalog:["id","title"]}
       ],
};

class PagesController extends AuthController {

  index() {

    Page.query()
      .where(this.params.query)
      .orderBy(()=>{return ['catalog_id','page'];})
      .end(project.default,
           (err, models) => {
             this.respond(err || models,project.default);
           });
  }

  show() {
    Page.find(this.params.route.id, (err, model) => {
      this.respond(err || model,project.full);
    });
  }

  create() {
    this.is_admin( ( accessToken, user ) => {
      let image=this.params.body.image;
      let thumbnail=this.params.body.thumbnail;

      let data=_.omit(this.params.body,['image','thumbnail']);

      data.image_contenttype=image.contentType;
      data.image=image;

      data.thumbnail_contenttype=thumbnail.contentType;
      data.thumbnail=thumbnail;

      Page.create(data, (err, model) => {
        if (err) { this.respond(err) }
          this.respond(model,project.default);
      });
    });
  }

  update() {
    this.is_admin( ( accessToken, user ) => {
      let image=this.params.body.image;
      let thumbnail=this.params.body.thumbnail;

      let data=_.omit(this.params.body,['image','thumbnail']);
      if (image) {
        data.image_contenttype=image.contentType;
        data.image=image;
      }
      if (thumbnail) {
        data.thumbnail_contenttype=thumbnail.contentType;
        data.thumbnail=thumbnail;
      }
      Page.update(this.params.route.id, data,(err, model) => {
        if (err) { this.respond(err) }
          this.respond(model,project.default);
      });
    });
  }

  destroy() {
    this.is_admin( (accessToken, user ) => {
      Page.destroy(this.params.route.id, (err, model) => {
        this.respond(err || model);
      });
    });
  }

}

module.exports = PagesController;
