#! /usr/bin/make -f
SHELL:=/bin/bash

host:=http://localhost:3000
#url=http://api.labels.qjhart.org;
token=qjh

http:=/usr/local/bin/http --ignore-stdin

pdfs:=$(shell ls *.pdf)
images:=$(patsubst %,image/%,${pdfs})
ocr:=$(patsubst %.pdf,ocr/%.txt,${pdfs})
thumbs:=$(patsubst %,thumbnails/%,${pdfs})

# These allow for sane processing of files with white space
#s+ = $(subst \ ,+,$1)
#+s = $(subst +,\ ,$1)

INFO:
	@echo "This uploads example data. Try make upload"
	@echo pdfs: '${pdfs}'
	@echo images: ${images+}

upload: image-files upload-catalogs upload-pages upload-marks

images:${images}

${images}:image/%.png:%^
	@[[ -d images ]] || mkdir images;
	convert -density 150 "$<" "$@";\

thumbs: ${thumbs}

${thumbs}:thumbnails/%:%
	@[[ -d thumbnails ]] || mkdir thumbnail;
	convert -quality 75 -thumbnail 20% "$<" "$@";\

ocr: ${ocr}
${ocr}:ocr/%.txt:%.pdf
	@[[ -d ocr ]] || mkdir ocr;
	pdftotext -layout -fixed 80 $< $@

ocr.put:=$(patsubst %,%.put,${ocr})

ocr.put:${ocr.put}

${ocr.put}:%.put:%
	t=`basename "$<" .txt | tr '+' ' '`; \
	id=`/usr/local/bin/http --form GET ${host}/catalogs?title="$$t" | jq -r .data[].id`; \
	if [[ $$id ]]; then \
		${http} --form PUT ${host}/catalogs/$$id?access_token=${token} ocr@"$<"; \
    touch $@;\
	  else \
	    echo $$t NO;\
	  fi ;\

pdfs.post:=$(patsubst %,%.post,${pdfs})
pdfs.post:${pdfs.post}

${pdfs.post}:%.pdf.post:%.pdf
		b=`basename "$<" .pdf`;\
		t=`echo $b | tr '+' ' '`;\
	  d=$${b##*+}; \
		${http} --form POST ${host}/catalogs?access_token=${token} \
		title="$$t" contents@"$<" thumbnail@"thumbnails/$<-0.png" \
    ocr@"ocr/$*.txt" publisher="Sherry-Lehmann Inc." date="$$d";

upload-pages:
	@for f in *.pdf; do \
	  t=`basename "$$f" .pdf | tr '+' ' '`; \
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
	tail -n +2 example_markup.psv |\
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
