import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

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
        axios
            .get(`${BACKEND_URL}/blog/all`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setBlogs(response.data.blogs);
                console.log(blogs);

                setLoading(false);
            });
    }, []);

    return { loading, blogs };
};
