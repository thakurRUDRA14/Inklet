import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { createBlogInput, updateBlogInput } from "@thakurrudra/inklet-common";
import sanitizeHtml from "sanitize-html";
import { verifyJWT } from "../middlewares/verifyJWT";

type Bindings = {
    DATABASE_URL: string;
    JWT_SECRET: string;
};

type Variables = {
    userId: string;
    prisma: PrismaClient;
};

export const blogRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

//middleware to check if the user is authenticated
blogRouter.use("/*", verifyJWT);

//blog routes

blogRouter.get("/", async (c) => {
    const prisma = c.get("prisma");

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
            select: {
                content: true,
                title: true,
                id: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        const totalBlogs = await prisma.blog.count();
        const totalPages = Math.ceil(totalBlogs / limit);
        if (blogs.length === 0) {
            return c.json({ message: "User has no blog posts" }, 200);
        }
        return c.json({ blogs, totalBlogs, totalPages });
    } catch (error: any) {
        console.error("Fetching Error:", error);
        return c.json(
            {
                message: "Internal Server Error",
                error: error.message,
            },
            500
        );
    }
});

blogRouter.get("/my-blogs", async (c) => {
    const prisma = c.get("prisma");

    try {
        const authorId = c.get("userId");
        const page = parseInt(c.req.query("page") as string) || 1;
        const limit = parseInt(c.req.query("limit") as string) || 10;
        const skip = (page - 1) * limit;
        const take = limit;
        const blogs = await prisma.blog.findMany({
            where: {
                authorId,
            },
            skip,
            take,
            orderBy: {
                createdAt: "desc",
            },
            select: {
                content: true,
                title: true,
                id: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        const totalBlogs = await prisma.blog.count({ where: { authorId } });
        const totalPages = Math.ceil(totalBlogs / limit);
        if (blogs.length === 0) {
            return c.json({ message: "User has no blog posts" }, 200);
        }
        return c.json({ blogs, totalBlogs, totalPages });
    } catch (error: any) {
        console.error("Fetching Error:", error);
        return c.json(
            {
                message: "Internal Server Error",
                error: error.message,
            },
            500
        );
    }
});

blogRouter.get("/:id", async (c) => {
    const prisma = c.get("prisma");

    const id = c.req.param("id");

    try {
        const blog = await prisma.blog.findFirst({
            where: { id },
            select: {
                content: true,
                title: true,
                id: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        if (!blog) {
            return c.json({ message: "Blog post not found" }, 404);
        }

        return c.json({ blog });
    } catch (error: any) {
        console.error("Fetching Error:", error);
        return c.json(
            {
                message: "Internal Server Error",
                error: error.message,
            },
            500
        );
    }
});

blogRouter.post("/", async (c) => {
    const prisma = c.get("prisma");

    const body = await c.req.json();

    const parsed = createBlogInput.safeParse(body);
    if (!parsed.success) {
        const firstError = parsed.error.issues[0];
        return c.json({ message: firstError.message, path: firstError.path }, 400);
    }

    const { title, content } = parsed.data;

    // Sanitize the HTML content
    const sanitizedContent = sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([
            "img",
            "h1",
            "h2",
            "h3",
            "p",
            "strong",
            "em",
            "ul",
            "ol",
            "li",
            "a",
            "blockquote",
            "code",
            "pre",
        ]),
        allowedAttributes: {
            a: ["href", "name", "target", "rel"],
            img: ["src", "alt", "width", "height"],
            p: ["style", "class"],
            blockquote: ["style", "class"],
            pre: ["style", "class"],
            code: ["style", "class"],
        },
        transformTags: {
            a: (tagName, attribs) => {
                // Ensure all links have target="_blank" and proper rel attributes
                return {
                    tagName,
                    attribs: {
                        ...attribs,
                        target: "_blank",
                        rel: attribs.rel || "noopener noreferrer",
                    },
                };
            },
        },
        allowedSchemes: ["http", "https", "data"],
        allowProtocolRelative: false,
        enforceHtmlBoundary: true,
    });

    const authorId = c.get("userId");
    if (!authorId) {
        return c.json({ message: "You are not authorized" }, 401);
    }

    try {
        const blog = await prisma.blog.create({
            data: {
                title,
                content: sanitizedContent,
                authorId,
            },
        });

        return c.json({
            id: blog.id,
        });
    } catch (error: any) {
        console.error("Post Error:", error);
        return c.json(
            {
                message: "Internal Server Error",
                error: error.message,
            },
            500
        );
    }
});

blogRouter.patch("/:id", async (c) => {
    const prisma = c.get("prisma");
    const id = c.req.param("id");

    if (!id || typeof id !== "string") {
        return c.json({ message: "Invalid blog ID" }, 400);
    }

    const body = await c.req.json();

    const parsed = updateBlogInput.safeParse(body);
    if (!parsed.success) {
        return c.json(
            {
                message: "Validation failed",
                errors: parsed.error.flatten(),
            },
            400
        );
    }

    const { title, content } = parsed.data;

    try {
        const updatedBlog = await prisma.blog.update({
            where: { id },
            data: { title, content, updatedAt: new Date() },
            select: {
                id: true,
                title: true,
                content: true,
                updatedAt: true,
            },
        });

        return c.json(
            {
                data: updatedBlog,
                message: "Blog post updated successfully",
            },
            200
        );
    } catch (error: any) {
        if (error.code === "P2025" || error.message?.includes("Record to update not found")) {
            return c.json({ message: "Blog post not found" }, 404);
        }

        console.error("Update Error:", error);
        return c.json(
            {
                message: "Internal Server Error",
                error: error.message,
            },
            500
        );
    }
});

blogRouter.delete("/:id", async (c) => {
    const prisma = c.get("prisma");
    const id = c.req.param("id");
    const userId = c.get("userId");

    try {
        // Attempt to delete the blog directly with a condition
        const blog = await prisma.blog.deleteMany({
            where: {
                id: id,
                authorId: userId,
            },
        });

        // Check if any records were actually deleted
        if (blog.count === 0) {
            // Either blog didn't exist or user wasn't authorized
            const exists = await prisma.blog.findUnique({
                where: { id },
                select: { id: true },
            });

            return c.json(
                {
                    message: exists ? "You are not authorized to delete this blog" : "Blog not found",
                },
                exists ? 401 : 404
            );
        }

        return c.json(
            {
                message: "Blog post deleted successfully",
            },
            200
        );
    } catch (error: any) {
        console.error("Delete Error:", error);
        return c.json(
            {
                message: "Internal Server Error",
                error: error.message,
            },
            500
        );
    }
});
