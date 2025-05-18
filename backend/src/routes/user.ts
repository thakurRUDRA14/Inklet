import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

type Bindings = {
    DATABASE_URL: string;
    JWT_SECRET: string;
};

export const userRouter = new Hono<{ Bindings: Bindings }>();

userRouter.post("/signup", async (c) => {
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
        return c.json({ message: "User already exists" }, 409);
    }
});

userRouter.post("/signin", async (c) => {
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
            return c.json({ message: "Incorrect Credentials" }, 403);
        }
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt });
    } catch (error) {
        console.log(error);
        return c.json({ message: "Internal Server Error" }, 500);
    }
});
