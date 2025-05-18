import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@thakurrudra/inklet-common";

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
    const parsed = signupInput.safeParse(body);
    if (!parsed.success) {
        const firstError = parsed.error.issues[0];
        return c.json({ message: firstError.message, path: firstError.path }, 400);
    }

    const { name, username, password } = parsed.data;

    try {
        const user = await prisma.user.create({
            data: {
                name,
                username,
                password,
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
    const parsed = signinInput.safeParse(body);
    if (!parsed.success) {
        const firstError = parsed.error.issues[0];
        return c.json({ message: firstError.message, path: firstError.path }, 400);
    }

    const { username, password } = parsed.data;

    try {
        const user = await prisma.user.findFirst({
            where: {
                username,
                password,
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
