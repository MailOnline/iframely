FROM node:24-alpine

EXPOSE 8061

WORKDIR /iframely

# Create new non-root user
RUN addgroup -S iframelygroup && adduser -S iframely -G iframelygroup
RUN apk add g++ make python3

# This will change the config to `config.<VALUE>.js` and the express server to change its behaviour.
# You should overwrite this on the CLI with `-e NODE_ENV=production`.
ENV NODE_ENV=local

## Utilize docker layer cache
COPY package.json yarn.lock .yarnrc.yml /iframely/
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable  # yarn 4 from package.json packageManager, not the image's yarn 1
RUN yarn workspaces focus --all --production

COPY . /iframely

USER iframely

ENTRYPOINT [ "/iframely/docker/entrypoint.sh" ]
