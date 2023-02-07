import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { proxy } from "https://deno.land/x/oak_http_proxy@2.1.0/mod.ts";

const port = Deno.env.get("PORT");
const goServiceUrl = Deno.env.get("GO_SERVICE_URL");
if (!port || !goServiceUrl) {
  console.log("Missing environment variable!");
  Deno.exit();
}

const posts = new Router({ prefix: "/posts" });

posts.get("/", proxy(`${goServiceUrl}/posts`));
posts.post("/", proxy(`${goServiceUrl}/posts`));

const app = new Application();

app.use(posts.routes());

app.use(posts.allowedMethods());

console.log(`-> http server started on port ${port}`)
await app.listen({ port: Number(port) });
