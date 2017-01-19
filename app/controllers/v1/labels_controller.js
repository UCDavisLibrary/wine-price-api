'use strict';

const _ = require('lodash');

const Nodal = require('nodal');
const Label = Nodal.require('app/models/label.js');
const AuthController=Nodal.require('app/controllers/auth_controller.js');

const project= {
  default:["id",
           "title",
           "country","language",
           "color","varietal","otherdesignation",
           "vintage_date",
          ],
  full:["id",
           "title",
        "type","country","language",
           "color","varietal","otherdesignation",
           "vintage_date",
           {label_collection:["id","title"]}
          ],
};


class V1LabelsController extends AuthController {

  index() {

    Label.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models,project.default);

      });

  }

  show() {

    Label.find(this.params.route.id, (err, model) => {

      this.respond(err || model,project.full);

    });

  }

  create() {
    this.is_admin( ( accessToken, user ) => {
      let image=this.params.body.image;
      let thumbnail=this.params.body.thumbnail;

      let data=_.omit(this.params.body,['image','thumbnail']);

      if (typeof image == "string" ) {
        let s=image;
        image=new Buffer(s);
        image.contentType='image/foo';
      }
      if (typeof thumbnail == "string" ) {
        let s=thumbnail;
        thumbnail=new Buffer(s);
        thumbnail.contentType='image/foo';
      }

      data.image_contenttype=image.contentType;
      data.image=image;

      data.thumbnail_contenttype=thumbnail.contentType;
      data.thumbnail=thumbnail;

      Label.create(data, (err, model) => {
        if (err) { this.respond(err) }
          this.respond(model,project.default);
      });
    });
  }

  update() {

    Label.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    Label.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1LabelsController;
