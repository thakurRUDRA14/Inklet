import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

interface Blog {
    content: string;
    title: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    author: {
        name: string;
    };
}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/blog/all", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            })
            .then((response) => {
                setBlogs(response.data.blogs);

                setLoading(false);
            });
    }, []);

    return { loading, blogs };
};
