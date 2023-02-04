FROM denoland/deno:alpine

EXPOSE 8081

WORKDIR /app

COPY . .

RUN deno cache main.ts

CMD ["deno", "run", "--allow-all", "--watch", "main.ts"]
