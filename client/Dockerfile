FROM node:slim

WORKDIR /app

EXPOSE 5173

COPY . .

RUN yarn install

CMD ["yarn", "dev"]