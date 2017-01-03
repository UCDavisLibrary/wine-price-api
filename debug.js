'use strict';

const Nodal = require('nodal');
const app = new Nodal.Application();
//app.listen(Nodal.my.Config.secrets.port);

app.debug= function(port) {
      port = port || 3000;

      this.server.listen(port);
      console.log(`Debugging: HTTP Worker listening on port ${port}`);

}

app.debug();
