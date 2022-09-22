const Koa = require("koa");
const app = new Koa();

app.use((ctx) => {
  if (ctx.path === "/") ctx.body = "<h1>Welcome to Homepage</h1>";
  else if (ctx.path === "/about")
    ctx.body = "<h1>About us Page</h1>";
  else if (ctx.path === "/contact")
    ctx.body = "<h1>Contact Page</h1>";
  else ctx.body = "<h1>404 Not Found</h1>";
});

port = 3000;

app.listen(port, () => {
  console.log(`Server started on Successfully on port ${port}`);
});