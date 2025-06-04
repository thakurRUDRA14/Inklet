import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";
import { prismaMiddleware } from "./middlewares/prisma";

const app = new Hono();
app.use("/*", cors());
app.use("*", prismaMiddleware);
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blogs", blogRouter);

export default app;
