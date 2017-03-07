#!/usr/bin/nodejs -i

var pg=require('pg');
var _=require('lodash');
var fs=require('fs');
// sets global PDFJS
require('pdfjs-dist');
Canvas = require('canvas');
Image = Canvas.Image;

var config = {
  user: 'quinn', //env var: PGUSER
  database: 'wine_price_development', //env var: PGDATABASE
  password: 'quinnIsGreat', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

// try the document
document = {
  createElement: function(element) {
    if (element == 'canvas') {
      return new Canvas(200,200);
    } else {
      return null;
    }
  }
}

function foo() {
  let canvas = new Canvas(200, 200)
  let ctx = canvas.getContext('2d');

  ctx.font = '30px Impact';
  ctx.rotate(.1);
  ctx.fillText("Awesome!", 50, 100);

  var te = ctx.measureText('Awesome!');
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.lineTo(50, 102);
  ctx.lineTo(50 + te.width, 102);
  ctx.stroke();

  console.log('<img src="' + canvas.toDataURL() + '" />');
  return canvas;
}

foo();

//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
var client = new pg.Client(config);

// connect to our database
client.connect(function (err) {
  if (err) throw err;

  // execute a query on our database
  let query='select id,user_id,title,publisher,year,filename,contenttype,contents,created_at,updated_at from catalogs where id=$1';
  client.query(query, [1], function (err, result) {
    if (err) throw err;

    // just print the result to the console
    for (let i=0; i<result.rows.length; i++) {
      console.log(`Row :${i}`);
      let row=result.rows[i];
      let contents=row.contents;
      let filetype=row.contenttype.split('/')[1];
      let file=`foo.${filetype}`;
      console.log(`type:${filetype} content.length :`+contents.length);
      fs.writeFileSync(file,contents);

      PDFJS.getDocument(contents).then(function getPdfHelloWorld(pdf) {
        //
        // Fetch the first page
        //
        console.log('Number of pages: ' + pdf.numPages);

        pdf.getPage(1).then(function getPageHelloWorld(page) {
          var scale = 1.5;
          var viewport = page.getViewport(scale);
          console.log(viewport);

          //
          // Prepare canvas using PDF page dimensions
          //
          function bar() {
          let canvas = new Canvas(200,200);
          var context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          //
          // Render PDF page into canvas context
          //
          var renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          return renderContext;
          }
          var renderContext=bar();
          page.render(renderContext);
          
          function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }

          setTimeout(function(){ 
              console.log('<img src="' + renderContext.canvasContext.canvas.toDataURL() + '" />');
          },5000);
        });
      });

      row=_.omit(row,['contents']);
      console.log(row);
    }
    // disconnect the client
    client.end(function (err) {
      if (err) throw err;
    });
  });
});
