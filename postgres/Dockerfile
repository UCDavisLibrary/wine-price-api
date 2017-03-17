FROM postgres:9.6
MAINTAINER Quinn Hart <qjhart@ucdavis.edu>

RUN apt-get update \
    && apt-get install -y build-essential git-core libv8-dev curl postgresql-server-dev-$PG_MAJOR \
    && rm -rf /var/lib/apt/lists/*

# install plv8
#ENV PLV8_BRANCH r1.4

#RUN cd /tmp && git clone -b $PLV8_BRANCH https://github.com/plv8/plv8.git \
#  && cd /tmp/plv8 \
#  && make all install

# install pg_prove
#RUN curl -LO http://xrl.us/cpanm \
#    && chmod +x cpanm \
#    && ./cpanm TAP::Parser::SourceHandler::pgTAP

# install pgtap
#ENV PGTAP_VERSION v0.97.0
#RUN git clone git://github.com/theory/pgtap.git \
#    && cd pgtap && git checkout tags/$PGTAP_VERSION \
#    && make install

# install pgjwt
RUN git clone https://github.com/michelp/pgjwt.git \
    && cd pgjwt && make install

# Put at end to stop remaking everytime :)
COPY initdb.d/ /docker-entrypoint-initdb.d/
