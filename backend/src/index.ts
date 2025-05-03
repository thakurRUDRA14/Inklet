import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

type Bindings = {
    DATABASE_URL: string;
    JWT_SECRET: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.post("/api/v1/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                username: body.username,
                password: body.password,
            },
        });

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({ jwt });
    } catch (error) {
        console.log(error);
        return c.json({ error: "User already exists" }, 409);
    }
});

app.post("/api/v1/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
      
        const user = await prisma.user.findFirst({
            where: {
                username: body.username,
                password: body.password,
            },
        });

        if (!user) {
            return c.json({ error: "Incorrect Credentials" }, 403);
        }
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt });
    } 
    
    catch (error) {
        console.log(error);
        c.status(500);
        return c.json({ error: "Internal Server Error" }, 500);
    }
});

app.post("/api/v1/blog", (c) => {
    return c.text("Hello Hono!");
});

app.put("/api/v1/blog", (c) => {
    return c.text("Hello Hono!");
});

app.get("/api/v1/blog/:id", (c) => {
    return c.text("Hello Hono!");
});

app.get("/api/v1/blog/bulk", (c) => {
    return c.text("Hello Hono!");
});

export default app;
