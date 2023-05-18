FROM node:12-alpine AS base

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
ENV PORT 8080
ENV HOST 20.9.42.153
ENV DATABASE funeraria
ENV USER root
ENV PASSWORD Andrey1202
EXPOSE 8080

CMD ["node", "./dist/index.js"]

# CMD ["npm", "run", "dev"]