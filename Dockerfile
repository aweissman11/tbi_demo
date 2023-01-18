# base node image
FROM node:16-bullseye-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

RUN apt-get update

# Install nginx to do internal routing in the container
RUN apt-get install -y nginx


# Install jq for docker-start.sh
RUN apt-get install -y jq


# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /myapp

ADD package.json package-lock.json ./
RUN npm install --production=false

# Setup production node_modules
FROM base as production-deps

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules
ADD package.json package-lock.json ./
RUN npm prune --production


# Build the app
FROM base as build

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules

ADD . .


RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

WORKDIR /myapp

COPY --from=production-deps /myapp/node_modules /myapp/node_modules
COPY --from=build /myapp/build /myapp/build
COPY --from=build /myapp/public /myapp/public
COPY --from=build /myapp/storybook-static /myapp/storybook-static
COPY --from=build /myapp/package.json /myapp/package.json
COPY --from=build /myapp/docker-start.sh /myapp/docker-start.sh

CMD ["/bin/bash", "./docker-start.sh"]
