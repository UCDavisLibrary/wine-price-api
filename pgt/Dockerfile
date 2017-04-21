# The nginx default uses debian:jessie as a base
FROM nginx:mainline
MAINTAINER Quinn Hart<qjhart@ucdavis.edu>

ENV POSTGREST_VERSION 0.4.0.0

RUN apt-get update && \
    apt-get install -y tar xz-utils wget libpq-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Directly copy our nginx configuration
COPY nginx_envsubst.conf /etc/nginx_envsubst.conf

RUN wget -O /usr/local/bin/wait-for-it https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && chmod 755 /usr/local/bin/wait-for-it

#RUN wget http://github.com/begriffs/postgrest/releases/download/v${POSTGREST_VERSION}/postgrest-${POSTGREST_VERSION}-ubuntu.tar.xz && \
#    tar --xz -xvf postgrest-${POSTGREST_VERSION}-ubuntu.tar.xz && \
#    mv postgrest /usr/local/bin/postgrest && \
#    rm postgrest-${POSTGREST_VERSION}-ubuntu.tar.xz

#RUN git clone https://github.com/begriffs/postgrest.git
#    && cd postrgrest && stack build --install-ghc --copy-bins --local-bin-path /usr/local/bin

# Build postgrest on a separate machine rather then in dockerfile
COPY postgrest /usr/local/bin/postgrest

# The input postgrest configuration includes no secrets, so will only work
# Read-only.  Mount over the /etc/postgres.conf file to add secrets
COPY pgt_envsubst.conf /etc/pgt_envsubst.conf

COPY start.sh /start.sh
# Only one command to initalize
CMD ["/start.sh"]
