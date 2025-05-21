import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@thakurrudra/inklet-common";
import { verifyJWT } from "../middlewares/verifyJWT";

type Bindings = {
    DATABASE_URL: string;
    JWT_SECRET: string;
};
type Variables = {
    userId: string;
};

export const blogRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

//middleware to check if the user is authenticated
blogRouter.use("/*", verifyJWT);

//blog routes

blogRouter.get("/all", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const page = parseInt(c.req.query("page") as string) || 1;
        const limit = parseInt(c.req.query("limit") as string) || 10;
        const skip = (page - 1) * limit;
        const take = limit;
        const blogs = await prisma.blog.findMany({
            skip,
            take,
            orderBy: {
                createdAt: "desc",
            },
            select:{
                content:true,
                title:true,
                id:true,
                createdAt:true,
                updatedAt:true,
                author:{
                    select:{
                        name:true,  
                    }
                }
            }
        });
        const total = await prisma.blog.count();
        const totalPages = Math.ceil(total / limit);
        if (blogs.length === 0) {
            return c.json({ message: "No blog posts found" }, 404);
        }
        return c.json({ blogs, total, totalPages });
    } catch (error) {
        console.log(error);
        return c.json({ message: "Error while fetching blog posts" }, 500);
    }
});

blogRouter.get("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    try {
        const blog = await prisma.blog.findFirst({
            where: { id },
        });

        if (!blog) {
            return c.json({ message: "Blog post not found" }, 404);
        }

        return c.json({ blog });
    } catch (error) {
        console.log(error);
        return c.json({ message: "Error while fetching blog post" }, 500);
    }
});

blogRouter.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const parsed = createBlogInput.safeParse(body);
    if (!parsed.success) {
        const firstError = parsed.error.issues[0];
        return c.json({ message: firstError.message, path: firstError.path }, 400);
    }

    const { title, content } = parsed.data;

    const authorId = c.get("userId");
    if (!authorId) {
        return c.json({ message: "You are not authorized" }, 401);
    }

    try {
        const blog = await prisma.blog.create({
            data: {
                title,
                content,
                authorId,
            },
        });

        return c.json({
            id: blog.id,
        });
    } catch (error) {
        console.log(error);
        return c.json({ message: "Internal Server Error" }, 500);
    }
});

blogRouter.put("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const parsed = updateBlogInput.safeParse(body);
    if (!parsed.success) {
        const firstError = parsed.error.issues[0];
        return c.json({ message: firstError.message, path: firstError.path }, 400);
    }

    const { id, title, content } = parsed.data;

    try {
        const updatedBlog = await prisma.blog.update({
            where: { id },
            data: { title, content },
        });

        return c.json(
            {
                id: updatedBlog.id,
                message: "Blog post updated successfully",
            },
            200
        );
    } catch (err: any) {
        if (err.code === "P2025" || err.message?.includes("Record to update not found")) {
            return c.json({ message: "Blog post not found" }, 404);
        }

        console.error("Update Error:", err);
        return c.json({ message: "Internal Server Error" }, 500);
    }
});

blogRouter.delete("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
        const blog = await prisma.blog.delete({
            where: {
                id: body.id,
            },
        });

        return c.json(
            {
                message: "Blog post deleted successfully",
            },
            200
        );
    } catch (error) {
        console.log(error);
        return c.json({ message: "Error while deleting the blog" }, 400);
    }
});
