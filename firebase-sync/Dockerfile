FROM node:6

RUN mkdir firebase-sync

COPY index.js /firebase-sync
COPY config.json /firebase-sync
COPY pg.js /firebase-sync
COPY package.json /firebase-sync

RUN cd firebase-sync && npm install

CMD bash -c 'node firebase-sync'
