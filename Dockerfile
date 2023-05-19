FROM node:12-alpine AS base
ARG port
ARG host
ARG database
ARG user
ARG password

WORKDIR /app

# ---------- Builder ----------
# Creates:
# - node_modules: production dependencies (no dev dependencies)
# - dist: A production build compiled with Babel
FROM base AS builder

COPY package*.json .babelrc.json ./

RUN npm install

COPY ./src ./src

RUN npm run build

RUN npm prune --production # Remove dev dependencies

# ---------- Release ----------
FROM base AS release

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

USER node
ENV PORT=$port
ENV HOST=$host
ENV DATABASE=$database
ENV USER=$user
ENV PASSWORD=$password
EXPOSE 8080

CMD ["node", "./dist/index.js"]