-- Specialized stop words
CREATE TEXT SEARCH DICTIONARY public.wine_stop (
    TEMPLATE = pg_catalog.simple,
    STOPWORDS = english,
--    STOPWORDS = wine,
    ACCEPT= false
);

--CREATE TEXT SEARCH DICTIONARY
--public.wine_syn (
-- TEMPLATE = synonym,
-- SYNONYMS = wine
--);

create text search configuration public.wine ( COPY=pg_catalog.english);

alter text search configuration wine
ALTER MAPPING FOR asciiword, asciihword, hword_asciipart,word, hword, hword_part
WITH wine_stop,english_stem;
--WITH wine_syn, wine_stop,english_stem;

alter text search configuration wine
drop mapping for email,url,url_path,sfloat,float;

SET default_text_search_config = 'public.wine';

create type strto_tsquery_t as (
phrase text,
plain text );

create function strto_tsquery(str text) returns strto_tsquery_t as $$
  select (
   replace((phraseto_tsquery($1))::text,'''',''),
   replace((plainto_tsquery($1))::text,'''','')
   )::strto_tsquery_t;
$$ LANGUAGE SQL IMMUTABLE;
