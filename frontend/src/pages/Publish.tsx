import { useState } from "react";
import { useCreateBlogMutation } from "../features/api/blogApiSlice";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";

const Publish = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [charCount, setCharCount] = useState(0);
    const [tags, setTags] = useState<string[]>([]);

    const [createBlog, { isLoading, isError, error }] = useCreateBlogMutation();

    const handlePublish = async () => {
        try {
            await createBlog({
                title,
                content,
                tags,
            }).unwrap();
            setTitle("");
            setContent("");
            setTags([]);
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
                            <svg
                                className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'>
                                <circle
                                    className='opacity-25'
                                    cx='12'
                                    cy='12'
                                    r='10'
                                    stroke='currentColor'
                                    strokeWidth='4'></circle>
                                <path
                                    className='opacity-75'
                                    fill='currentColor'
                                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                            </svg>
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
