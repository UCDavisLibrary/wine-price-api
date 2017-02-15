#! /usr/bin/make -f
SHELL:=/bin/bash

host:=http://localhost:3000
#url=http://api.labels.qjhart.org;
token=qjh

http:=/usr/local/bin/http --ignore-stdin

INFO:
	@echo "This uploads example data. Try make upload"

upload: image-files upload-catalogs upload-pages upload-marks

image-files:
	@[[ -d images ]] || mkdir images;
	@[[ -d thumbnails ]] || mkdir images;
	@for f in *.pdf; do \
		echo -n $$f; echo -n " thumbnail";\
		convert -quality 75 -thumbnail 20% "$$f" "thumbnails/$$f.png";\
		echo -n " images";\
		convert -density 150 "$$f" "images/$$f.png";\
		echo  "";\
	done

upload-catalogs:
	@for f in *.pdf; do\
		echo "$$f";\
		t=`basename "$$f" .pdf`;\
	  d=$${t##* }; \
		${http} --form POST ${host}/catalogs?access_token=${token} \
		title="$$t" contents@"$$f" thumbnail@"thumbnails/$$f-0.png" \
		publisher="Sherry-Lehmann Inc." date="$$d"; \
	done

upload-pages:
	@for f in *.pdf; do \
	  t=`basename "$$f" .pdf`; \
	  id=`/usr/local/bin/http --form GET ${host}/catalogs?title="$$t" | jq -r .data[].id`; \
	  if [[ $$id ]]; then \
    for p in "images/$$f"-?.png "images/$$f"-??.png "images/$$f"-???.png; do \
      g=$${p##*-}; g=$${g%.png};\
      t=$${p/images/thumbnails};\
			${http} --form POST ${host}/pages?access_token=${token} \
      catalog_id=$$id page=$$g thumbnail@"$$t" image@"$$p" ; \
    done \
	  else \
	    echo $$t NO;\
	  fi ;\
	done

upload-marks:
	@declare -a v=('Catalog' 'page' 'r' 'c' 'type' 'color' 'country' 'otherdesignation' 'brandname' 'vintage_date' 'region' 'bottlesize' 'perprice' 'caseprice' ); \
	tail -n +2 example_markup.tsv |\
	while IFS='|' read -r -a m; do \
		echo -n "item:$${m[0]}..";\
	  id=`${http} ${host}/catalogs?title="$${m[0]}" | jq -r .data[].id`;\
	  if [[ $$id ]]; then \
      echo -n "id:$$id..";\
			page_id=`${http} "${host}/pages?catalog_id=$$id&page=$${m[1]}" | jq -r .data[].id`; \
		  if [[ $$page_id ]]; then \
				echo "page_id: $$page_id"; \
				vars="catalog_id=$$id page_id=$$page_id";\
				for i in 2 3 4 5 6 7 8 9 10 11 12 12; do\
					if [[ $${m[$$i]} ]]; then \
					  vars+=" $${v[$$i]}='$${m[$$i]}'";\
					fi;\
				done;\
				eval "${http} --form POST ${host}/price_marks?access_token=${token} $$vars";\
			fi;\
		fi;\
	done

test:
	tail -n +2 example_markup.tsv |\
	while IFS='|' read -r -a m; do \
		echo "vintage_year:$${m[9]}";\
	done
