#! /usr/bin/make -f
SHELL:=/bin/bash

host:=http://localhost:8888
#url=http://api.labels.qjhart.org;
token=qjh

#http:=/usr/bin/http --ignore-stdin
http:=/usr/local/bin/http --ignore-stdin

#pdfs:=$(shell ls *.pdf)
redo_pdfs:=\
210-Christmas+Catalog+1969.pdf
#18-Report.+Present+Wine+Situation+1962.pdf \
#24-Seasons+Greetings+1973.pdf \
#28-Seasons+Greetings+1971+.+1972.pdf \
#41-Letter.+Domaine+De+La+Romanee+Conti.pdf \
#52-Vintage+of+Values+1970.pdf \
#60-Seasons+Greetings+1967.pdf \
#73-Letter+Bellows+&+Company+1947.pdf \
#81-Yuletide+Vintage+of+Values+1968-1969.pdf \
#122-Charette+of+VIns+du+Pays+1949.pdf \
#123-Letter+1952.pdf \
#124-Letter+Hotel+George+Paris+1948.pdf \
#137-Letter+1957.pdf \
#156-Memo+1956.pdf \
#163-Seasons+Greetings+1956.pdf \
#191-Seasons+Greetings+1967.pdf 202-Newsletter.+Price+list+1967.pdf 212-News+April+1969.pdf


pdfs:=${redo_pdfs} ${new_pdfs}

images:=$(patsubst %.pdf,images/%-0.png,${pdfs})
ocr:=$(patsubst %.pdf,ocr/%.txt,${pdfs})
thumbs:=$(patsubst %.pdf,thumbnails/%-0.png,${pdfs})
csvs:=$(patsubst %.pdf,csv/%.csv,${pdfs})
foos:=$(patsubst %.pdf,%.foo,${pdfs})

INFO:
	@echo "This uploads example data. Try make images thumbs ocr csvs"
	@echo "The result will be a file that can be uploaded into your db for further processing."
	@echo pdfs: "${pdfs}"
	@echo images: "${images}"

upload: image-files upload-catalogs upload-pages upload-marks

images:${images}

${images}:images/%-0.png:%.pdf
	@[[ -d images ]] || mkdir images;
	convert -density 150 "$<" "images/$*.png";\

thumbs: ${thumbs}

${thumbs}:thumbnails/%-0.png:%.pdf
	@[[ -d thumbnails ]] || mkdir thumbnails;
	convert -quality 75 -thumbnail 20% "$<" "thumbnails/$*.png";\

ocr: ${ocr}
${ocr}:ocr/%.txt:%.pdf
	@[[ -d ocr ]] || mkdir ocr;
	pdftotext -layout -fixed 80 "$<" "$@"

ocr.put:=$(patsubst %,%.put,${ocr})


# These allow for sane processing of files with white space
#s+ = $(subst \ ,+,$1)
#+s = $(subst +,\ ,$1)

# You need to use GIMP to select the 320x384 thumbnail that goes in the cover directory

csvs:${csvs}
${csvs}:csv/%.csv:%.pdf
	echo 'filename,page,image,thumbnail,ocr' > "$@"; \
	echo -n '"$<",,\x' >> "$@"; \
	hexdump -v -e '/1 "%02X"' "$*.pdf" >> "$@"; \
	echo -n ',\x' >> "$@"; \
	hexdump -v -e '/1 "%02X"' "cover/$*.png" >> "$@";\
	echo -n ',\x' >> "$@";\
	hexdump -v -e '/1 "%02X"' "ocr/$*.txt" >> "$@";\
	echo '' >> "$@";\
  f="images/$*-*.png"; \
	for i in $$f; do \
	  n=`basename $$i .png | sed -e 's/^.*-\([0-9]*\)$$/\1/'`; \
		echo -n "\"$<\",$$n,\x" >> "$@"; \
		hexdump -v -e '/1 "%02X"' "images/$*-$$n.png" >> "$@"; \
		echo -n ',\x' >> "$@"; \
		hexdump -v -e '/1 "%02X"' "thumbnails/$*-$$n.png" >> "$@";\
		echo ',""' >> "$@";\
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
	tail -n +2 example_markup.psv |\
	while IFS='|' read -r -a m; do \
		echo "vintage_year:$${m[9]}";\
	done
