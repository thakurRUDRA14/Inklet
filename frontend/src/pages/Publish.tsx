import { useState } from "react";
import { useCreateBlogMutation } from "../features/api/blogApiSlice";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Publish = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [charCount, setCharCount] = useState(0);

    const [createBlog, { isLoading, isError, error }] = useCreateBlogMutation();

    const handlePublish = async () => {
        try {
            await createBlog({
                title,
                content,
            }).unwrap();
            setTitle("");
            setContent("");
            setCharCount(0);
            navigate("/blogs");
        } catch (err) {
            console.error("Failed to publish blog:", err);
        }
    };

    return (
        <div className='max-w-4xl mx-auto p-6 space-y-6'>
            <h1 className='text-center text-5xl font-bold text-gray-800'>Publish</h1>

            <Editor
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                charCount={charCount}
                setCharCount={setCharCount}
            />

            {isError && (
                <div className='text-red-500 text-sm'>
                    {error && "data" in error ? (error.data as { message?: string })?.message || "Failed to publish blog" : "Failed to publish blog"}
                </div>
            )}

            <div className='flex justify-center'>
                <button
                    onClick={handlePublish}
                    disabled={!title || isLoading}
                    className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${
                        !title || isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}>
                    {isLoading ? (
                        <span className='flex items-center'>
                            {!!isLoading && <Spinner className={"h-6 w-6 text-white"} />}
                            Publishing...
                        </span>
                    ) : (
                        "Publish"
                    )}
                </button>
            </div>
        </div>
    );
};

export default Publish;
