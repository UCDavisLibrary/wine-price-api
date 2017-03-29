FROM debian:jessie

ENV POSTGREST_VERSION 0.4.0.0

RUN apt-get update && \
    apt-get install -y tar xz-utils wget libpq-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#RUN wget http://github.com/begriffs/postgrest/releases/download/v${POSTGREST_VERSION}/postgrest-${POSTGREST_VERSION}-ubuntu.tar.xz && \
#    tar --xz -xvf postgrest-${POSTGREST_VERSION}-ubuntu.tar.xz && \
#    mv postgrest /usr/local/bin/postgrest && \
#    rm postgrest-${POSTGREST_VERSION}-ubuntu.tar.xz

#RUN git clone https://github.com/begriffs/postgrest.git
#    && cd postrgrest && stack build --install-ghc --copy-bins --local-bin-path /usr/local/bin

# Build postgrest on a separate machine rather then in dockerfile
COPY postgrest /usr/local/bin/postgrest

# PostgREST reads /etc/postgrest.conf so map the configuration
# file in when you run this container
CMD exec postgrest /etc/postgrest.conf

EXPOSE 3000
