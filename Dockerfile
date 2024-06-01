FROM node:20-alpine as build

WORKDIR /app

COPY package*.json .

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# docker run --env-file .env -p 3001:80 --net my-network react-workevent