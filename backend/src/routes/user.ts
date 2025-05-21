import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@thakurrudra/inklet-common";
import { verifyJWT } from "../middlewares/verifyJWT";

type Bindings = {
    DATABASE_URL: string;
    JWT_SECRET: string;
};
type Variables = {
    userId: string;
};

export const userRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

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
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ user, token });
    } catch (error) {
        console.log(error);
        return c.json({ message: "Internal Server Error" }, 500);
    }
});

userRouter.post("/me", verifyJWT, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const userId = c.get("userId");
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                username: true,
                createdAt: true,
                updatedAt: true,
                password: false,
            },
        });
        if (!user) {
            return c.json({ error: "User not found" }, 404);
        }

        return c.json({
            user,
        });
    } catch (error) {
        console.error("Error in /me endpoint:", error);

        if (error instanceof Error && error.message.includes("JWT")) {
            return c.json({ error: "Unauthorized - Invalid token" }, 401);
        }

        return c.json({ error: "Internal Server Error" }, 500);
    } finally {
        await prisma.$disconnect();
    }
});