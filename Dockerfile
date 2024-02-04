FROM node:18-alpine

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev chromium nss freetype harfbuzz ca-certificates ttf-freefont nodejs yarn

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json yarn.lock ./
RUN yarn config set network-timeout 600000 -g && yarn install
RUN npx puppeteer browsers install chrome

WORKDIR /opt/app
COPY . .
ENV PATH /opt/node_modules/.bin:$PATH
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
RUN chown -R node:node /opt/app
USER node

RUN ["yarn", "build"]

EXPOSE 1337

CMD ["yarn", "develop"]