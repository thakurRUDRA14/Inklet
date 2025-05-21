import { Context } from "hono";
import { verify } from "hono/jwt";
import { z } from "zod";

const idSchema = z.string().uuid();

export async function verifyJWT(c: Context, next: Function) {
    const authHeader = c.req.header("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    try {
        const token = authHeader.split(" ")[1];
        const { id } = await verify(token, c.env.JWT_SECRET);
        const result = idSchema.safeParse(id);

        if (!result.success) {
            return c.json({ error: "Invalid token" }, 401);
        }

        // Set user in context for downstream handlers
        c.set("userId", result.data as string);
        await next();
    } catch (err) {
        console.error("Auth error:", err);
        return c.json({ error: "Unauthorized" }, 401);
    }
}
