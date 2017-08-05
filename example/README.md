# Example data

This example data can be used to warm up a development machine.  In
addition, I am using this directory to add new files to the catalogs,
using the Makefile.  You can see in the Makefile that you specify the new PDFS you want to include.

You also need to go into gimp, and create a png to use for the cover. This image needs to be

``` bash
make images thumbs ocr csvs
```

This results in files being in the csv sub-directory.  You can then
upload those csv files into the catalog databse, and run the commands
in the csv to media sql file to upload that data.

