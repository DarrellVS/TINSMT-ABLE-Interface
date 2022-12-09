ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN apk add --no-cache \
    nodejs \
    npm \
    git

COPY package.json /
COPY src/ /src/
COPY public/ /public/
COPY tsconfig.json /
COPY .eslintrc.json /
COPY next-env.d.ts /
COPY next.config.js /
COPY tsconfig.json /
RUN npm install -g yarn --unsafe-perm
RUN yarn config set unsafe-perm true
RUN cd / && yarn

COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]