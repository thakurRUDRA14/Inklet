import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@thakurrudra/inklet-common";
import { verifyJWT } from "../middlewares/verifyJWT";
import bcrypt from "bcryptjs";

type Bindings = {
    DATABASE_URL: string;
    JWT_SECRET: string;
};
type Variables = {
    userId: string;
    prisma: PrismaClient;
};

export const userRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

userRouter.post("/signup", async (c) => {
    const prisma = c.get("prisma");

    const body = await c.req.json();

    const parsed = signupInput.safeParse(body);
    if (!parsed.success) {
        const errors = parsed.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));
        return c.json({ errors }, 400);
    }

    const { name, username, password } = parsed.data;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const existingUser = await prisma.user.findUnique({
            where: { username },
        });
        if (existingUser) {
            return c.json({ message: "User already exists" }, 409);
        }

        const user = await prisma.user.create({
            data: {
                name,
                username,
                password: hashedPassword,
            },
            select: { id: true, name: true, username: true, createdAt: true, updatedAt: true },
        });

        const token = await sign({ id: user.id, exp: Math.floor(Date.now() / 1000) + 86400 }, c.env.JWT_SECRET);

        return c.json({
            user,
            token,
            expiresIn: "24h",
        });
    } catch (error) {
        console.error("Signup error:", error);
        return c.json({ message: "Internal server error" }, 500);
    }
});

userRouter.post("/signin", async (c) => {
    const prisma = c.get("prisma");

    const body = await c.req.json();

    const parsed = signinInput.safeParse(body);
    if (!parsed.success) {
        const errors = parsed.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));
        return c.json({ errors }, 400);
    }

    const { username, password } = parsed.data;

    try {
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return c.json({ message: "Invalid username or password" }, 401);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return c.json({ message: "Invalid username or password" }, 401);
        }

        const userToken = await sign(
            {
                id: user.id,
                exp: Math.floor(Date.now() / 1000) + 86400,
            },
            c.env.JWT_SECRET
        );

        const { password: _, ...userData } = user;
        return c.json({
            user: userData,
            userToken,
            expiresIn: "24h",
        });
    } catch (error) {
        console.error("Signin error:", error);
        return c.json({ message: "Internal server error" }, 500);
    }
});

userRouter.get("/me", verifyJWT, async (c) => {
    const prisma = c.get("prisma");
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
            return c.json({ message: "User not found" }, 404);
        }

        return c.json({ user });
    } catch (error) {
        console.error("Get user error:", error);
        return c.json({ message: "Internal server error" }, 500);
    }
});
