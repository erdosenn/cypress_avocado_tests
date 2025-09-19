FROM cypress/included:latest AS cypress
ENV TZ="Europe/Warsaw"
ENV LANG pl_PL.UTF-8

ARG CYPRESS_PROJECT_DIR

WORKDIR $CYPRESS_PROJECT_DIR
COPY ./ ./
RUN npm install

RUN apt-get update && apt-get install --no-install-recommends -y locales locales-all chromium \
    && rm -rf /var/lib/apt/lists/* \
    && locale-gen pl_PL.UTF-8 \
    && update-locale LANG=pl_PL.UTF-8

COPY ./ ./

ENTRYPOINT ["cypress", "open", "--project", ".", "--config-file", "cypress-config.ts"]
