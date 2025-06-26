import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { MiddlewareHandler } from "hono";

export const prismaMiddleware: MiddlewareHandler = async (c, next) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    c.set("prisma", prisma);

    try {
        await next();
    } finally {
        await prisma.$disconnect().catch(console.error);
    }
};
