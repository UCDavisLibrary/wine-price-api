create table catalog_pages (
media_id uuid,
filename text,
page integer,
contents bytea,
thumbnail_png bytea,
ocr text);

-- Get the new catalogs
-- for i in Fc/210-Christmas+Catalog+1969.csv; do dcpg psql -c "\COPY catalog_pages (filename,page,contents,thumbnail_png,ocr) from '/app/$i' with csv header"; done

-- Add media_ids to the pages.
update catalog_pages set media_id=gen_random_uuid();

-- Fix the ocr input.
update catalog_pages set ocr=convert_from(ocr::bytea,'utf8')
where page is null;

-- Note the media_id = catalog_id
-- Add the catalog to the media table
insert into media (media_id,title,contents,thumbnail_png,thumbnail2x_png,ocr)
select
p.media_id,
replace(regexp_replace(filename,'^\d+-(.*).pdf$','\1'),'+',' ') as title,
contents,
thumbnail_png,
thumbnail_png,
ocr
from catalog_pages p
where page
is null;

-- add to catalog table
with y as (
 select
 media_id,(regexp_matches(filename,'\d\d\d\d'))[1] as year
 from catalog_pages
 where page is null
)
insert into catalogs (catalog_id,title,publisher,year)
select media_id,
replace(regexp_replace(filename,'^\d+-(.*).pdf$','\1'),'+',' ') as title,
'Sherry-Lehmann Inc.',
year::integer
from catalog_pages left join
y using (media_id)
where page is null;


-- Now import each page
-- o is the page ocr info.
with o as (
 select filename,media_id as catalog_id,
 string_to_array(ocr,E'\x0C') as page_ocr
 from catalog_pages
 where page is null
)
insert into media (media_id,title,contents,thumbnail2x_png,thumbnail_png,ocr)
select
p.media_id,
replace(regexp_replace(filename,'^\d+-(.*).pdf$','\1'),'+',' ')||' (pg. '||page||')' as title,
contents,
thumbnail_png,
thumbnail_png,
page_ocr[page+1] as ocr
from catalog_pages p join
o using (filename)
where page
is not null;


-- insert the pages
with o as (
 select filename,media_id as catalog_id
 from catalog_pages
 where page is null
)
insert into pages (page_id,catalog_id,page)
select media_id,
catalog_id,
page
from catalog_pages p join
o using (filename)
where page is not null;
