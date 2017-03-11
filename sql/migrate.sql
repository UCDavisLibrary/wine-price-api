create temp table catalog_id_uuid as
with a as (
 select
 gen_random_uuid() as catalog_id,
 gen_random_uuid() as media_id,*
 from public.catalogs
),
b as (
 insert into media (media_id,title,contents,mime_type,thumbnail_png,ocr)
 select media_id,title,contents,contenttype,thumbnail,ocr
 from a returning media_id
),
c as (
 insert into catalogs (catalog_id,title,publisher,year,media_id)
 select catalog_id,title,publisher,year,media_id from a returning *
)
select id,catalog_id from a;

-- Get per page OCR
create temp table page_ocr as
with c as (
select catalog_id,
a.page as page,
a.ocr
from public.catalogs join
catalog_id_uuid using(id),
regexp_split_to_table(ocr,'\x0C') with ordinality a(ocr,page)
)
select catalog_id,page,ocr from c;


create temp table page_id_uuid as
with a as (
select
gen_random_uuid() as page_id,
gen_random_uuid() as media_id,
c.catalog_id,
c.title || ' (pg. ' || p.page+1 || ')' as title,
p.id,p.page+1 as page,
p.image,p.image_contenttype,p.thumbnail,
o.ocr
from public.pages p
join catalog_id_uuid n on (p.catalog_id=n.id)
join catalogs c on (n.catalog_id = c.catalog_id)
join page_ocr o on (c.catalog_id=o.catalog_id and o.page+1=p.page)
),
b as (
 insert into media (media_id,title,contents,mime_type,thumbnail_png,ocr)
 select media_id,title,image,image_contenttype,thumbnail,ocr
 from a returning media_id
),
c as (
 insert into pages (page_id,catalog_id,page,media_id)
 select page_id,catalog_id,page,media_id
 from a
 returning *
)
select id,page_id from a;
