'use strict';

const Nodal = require('nodal');
const router = new Nodal.Router();

/* Middleware */
/* executed *before* Controller-specific middleware */

const CORSMiddleware = Nodal.require('middleware/cors_middleware.js');
// const CORSAuthorizationMiddleware = Nodal.require('middleware/cors_authorization_middleware.js');
// const ForceWWWMiddleware = Nodal.require('middleware/force_www_middleware.js');
// const ForceHTTPSMiddleware = Nodal.require('middleware/force_https_middleware.js');

router.middleware.use(CORSMiddleware);
// router.middleware.use(CORSAuthorizationMiddleware);
// router.middleware.use(ForceWWWMiddleware);
// router.middleware.use(ForceHTTPSMiddleware);

/* Renderware */
/* executed *after* Controller-specific renderware */

const GzipRenderware = Nodal.require('renderware/gzip_renderware.js')

router.renderware.use(GzipRenderware);

/* Routes */

const IndexController = Nodal.require('app/controllers/index_controller.js');

/* generator: begin imports */

const WinePricesController = Nodal.require('app/controllers/wine_prices_controller.js');
const UsersController = Nodal.require('app/controllers/users_controller.js');
const ProvenancesController = Nodal.require('app/controllers/provenances_controller.js');
const AccessTokensController = Nodal.require('app/controllers/access_tokens_controller.js');
const CatalogsController = Nodal.require('app/controllers/catalogs_controller.js');
const CatalogsFileController = Nodal.require('app/controllers/catalogs_file_controller.js');
const CatalogsThumbnailController = Nodal.require('app/controllers/catalogs_thumbnail_controller.js');
const UserAclsController = Nodal.require('app/controllers/user_acls_controller.js');
const PagesImageController = Nodal.require('app/controllers/pages_image_controller.js');
const PagesThumbnailController = Nodal.require('app/controllers/pages_thumbnail_controller.js');
const PagesController = Nodal.require('app/controllers/pages_controller.js');
const LabelCollectionsController = Nodal.require('app/controllers/label_collections_controller.js');
const LanguagesController = Nodal.require('app/controllers/languages_controller.js');
const CountriesController = Nodal.require('app/controllers/countries_controller.js');
const LabelsImageController = Nodal.require('app/controllers/labels_image_controller.js');
const LabelsThumbnailController = Nodal.require('app/controllers/labels_thumbnail_controller.js');
const LabelsController = Nodal.require('app/controllers/labels_controller.js');
const PriceMarksController = Nodal.require('app/controllers/price_marks_controller.js');

/* generator: end imports */

router.route('/').use(IndexController);

/* generator: begin routes */

router.route('/wine_prices/{id}').use(WinePricesController);
router.route('/users/{id}').use(UsersController);
router.route('/provenances/{id}').use(ProvenancesController);
router.route('/access_tokens/{id}').use(AccessTokensController);
router.route('/catalogs/{id}').use(CatalogsController);
router.route('/catalogs/{id}/file').use(CatalogsFileController);
router.route('/catalogs/{id}/thumbnail').use(CatalogsThumbnailController);
router.route('/user_acls/{id}').use(UserAclsController);
router.route('/pages/{id}').use(PagesController);
router.route('/pages/{id}/image').use(PagesImageController);
router.route('/pages/{id}/thumbnail').use(PagesThumbnailController);
router.route('/label_collections/{id}').use(LabelCollectionsController);
router.route('/languages/{id}').use(LanguagesController);
router.route('/countries/{id}').use(CountriesController);
router.route('/labels/{id}').use(LabelsController);
router.route('/labels/{id}/image').use(LabelsImageController);
router.route('/labels/{id}/thumbnail').use(LabelsThumbnailController);
router.route('/price_marks/{id}').use(PriceMarksController);

/* generator: end routes */

module.exports = router;
