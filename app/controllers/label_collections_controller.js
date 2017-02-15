'use strict';

const Nodal = require('nodal');
const LabelCollection = Nodal.require('app/models/label_collection.js');
const AuthController=Nodal.require('app/controllers/auth_controller.js');

const project={
	default:["id","title","publisher"],
	full:["id","title","publisher",
				{user:["username"]}
			 ],
};

class LabelCollectionsController extends AuthController {

  index() {

    LabelCollection.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models,project.default);

      });

  }

  show() {

    LabelCollection.find(this.params.route.id, (err, model) => {

      this.respond(err || model,project.full);

    });

  }

  create() {
    this.is_admin( ( accessToken, user ) => {
			LabelCollection.create(this.params.body, (err, model) => {
        if (err) { this.respond(err) }
          this.respond(model,project.default);
      });
    });
  }

  update() {
    this.is_admin( ( accessToken, user ) => {
			LabelCollection.update(this.params.route.id, this.params.body, (err, model) => {
				this.respond(err || model);
			});
		});
  }

  destroy() {
    this.is_admin( ( accessToken, user ) => {
			LabelCollection.destroy(this.params.route.id, (err, model) => {
				this.respond(err || model);
			});
		});
  }

}

module.exports = LabelCollectionsController;
