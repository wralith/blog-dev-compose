import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const port = Deno.env.get("PORT");
const goServiceUrl = Deno.env.get("GO_SERVICE_URL");
if (!port || !goServiceUrl) {
  console.log("Missing environment variable!");
  Deno.exit();
}

const posts = new Router({ prefix: "/posts" });

posts.get("/", async ctx => {
  // Do some stuff maybe
  try {
    const res = await fetch(`${goServiceUrl}/posts`);
    ctx.response.body = await res.json();
  } catch (err) {
    console.log(err); // Handle it!
  }
});

posts.post("/", async ctx => {
  // ...
  try {
    const { title, content } = await ctx.request.body().value;
    const res = await fetch(`${goServiceUrl}/posts`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      ctx.response.status = 201;
    } else {
      throw new Error("...");
    }
  } catch (err) {
    console.log(err); // ...
  }
});

const app = new Application();

app.use(posts.routes());
app.use(posts.allowedMethods());

await app.listen({ port: Number(port) });
